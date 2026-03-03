import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { subscribeToast } from "../utils/toastBus";

export const ToastContext = createContext(null);

const TOAST_TTL_MS = 3800;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback((payload) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const toast = {
      id,
      type: payload.type || "info",
      message: payload.message || "Done.",
    };
    setToasts((prev) => [toast, ...prev].slice(0, 5));
    window.setTimeout(() => removeToast(id), payload.ttl || TOAST_TTL_MS);
  }, [removeToast]);

  useEffect(() => subscribeToast(pushToast), [pushToast]);

  const value = useMemo(() => ({ toasts, removeToast, pushToast }), [toasts, removeToast, pushToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
}

function ToastViewport({ toasts, onClose }) {
  if (!toasts.length) return null;

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-2">
      {toasts.map((toast) => {
        const tone =
          toast.type === "success"
            ? "border-jx-green/50 bg-jx-green/10 text-jx-green"
            : toast.type === "error"
              ? "border-jx-red/50 bg-jx-red/10 text-jx-red"
              : "border-jx-blue/50 bg-jx-blue/10 text-jx-blue";

        return (
          <div key={toast.id} className={`glass pointer-events-auto rounded-xl border px-3 py-2 ${tone}`}>
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium">{toast.message}</p>
              <button
                type="button"
                onClick={() => onClose(toast.id)}
                className="rounded-md bg-black/20 px-2 py-0.5 text-xs text-white/80"
              >
                x
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

