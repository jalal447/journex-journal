import { createContext, useCallback, useMemo, useState } from "react";
import { analyticsApi, tradesApi } from "../api/endpoints";
import { toastError } from "../utils/toastBus";

export const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [summary, setSummary] = useState(null);
  const [equityCurve, setEquityCurve] = useState([]);
  const [sessionPerformance, setSessionPerformance] = useState([]);
  const [pairPerformance, setPairPerformance] = useState([]);
  const [pnlCalendar, setPnlCalendar] = useState([]);
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshAnalytics = useCallback(async () => {
    const [summaryRes, equityRes, sessionRes, pairRes, calendarRes] = await Promise.all([
      analyticsApi.summary(),
      analyticsApi.equityCurve(),
      analyticsApi.sessionPerformance(),
      analyticsApi.pairPerformance(),
      analyticsApi.pnlCalendar(),
    ]);
    setSummary(summaryRes.data);
    setEquityCurve(equityRes.data);
    setSessionPerformance(sessionRes.data);
    setPairPerformance(pairRes.data);
    setPnlCalendar(calendarRes.data);
  }, []);

  const refreshTrades = useCallback(async () => {
    const { data } = await tradesApi.list();
    setTrades(data);
  }, []);

  const loadPrivateData = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([refreshTrades(), refreshAnalytics()]);
    } catch {
      toastError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, [refreshTrades, refreshAnalytics]);

  const value = useMemo(
    () => ({
      summary,
      equityCurve,
      sessionPerformance,
      pairPerformance,
      pnlCalendar,
      trades,
      loading,
      refreshTrades,
      refreshAnalytics,
      loadPrivateData,
      setTrades,
    }),
    [summary, equityCurve, sessionPerformance, pairPerformance, pnlCalendar, trades, loading, refreshTrades, refreshAnalytics, loadPrivateData]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}
