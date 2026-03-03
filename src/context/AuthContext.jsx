import { createContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../api/endpoints";
import { toastInfo, toastSuccess } from "../utils/toastBus";

export const AuthContext = createContext(null);
const TRIAL_DAYS = Number(import.meta.env.VITE_TRIAL_DAYS || 7);

function getTrialEndMs(user) {
  if (!user?.created_at) return null;
  const created = new Date(user.created_at);
  if (Number.isNaN(created.getTime())) return null;
  return created.getTime() + TRIAL_DAYS * 24 * 60 * 60 * 1000;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await authApi.me();
        setUser(data);
      } catch {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  const login = async (email, password, options = {}) => {
    const { data } = await authApi.login({ email, password });
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    const me = await authApi.me();
    setUser(me.data);
    if (!options.silentSuccess) toastSuccess("Logged in successfully.");
  };

  const register = async (payload) => {
    await authApi.register(payload);
    await login(payload.email, payload.password, { silentSuccess: true });
    toastSuccess("Account created successfully.");
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    toastInfo("Logged out.");
  };

  const value = useMemo(
    () => {
      const trialEndMs = getTrialEndMs(user);
      const inTrial = !!trialEndMs && Date.now() <= trialEndMs;
      const hasPaidPro = !!(user?.subscription_tier === "pro" || user?.is_premium);
      return {
        user,
        loading,
        isAuthenticated: !!user,
        isPro: hasPaidPro || inTrial,
        hasPaidPro,
        inTrial,
        trialEndMs,
        trialDays: TRIAL_DAYS,
        login,
        register,
        logout,
        setUser,
      };
    },
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
