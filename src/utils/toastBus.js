const listeners = new Set();

export function subscribeToast(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function emitToast(payload) {
  listeners.forEach((listener) => listener(payload));
}

export function toastSuccess(message, options = {}) {
  emitToast({ type: "success", message, ...options });
}

export function toastError(message, options = {}) {
  emitToast({ type: "error", message, ...options });
}

export function toastInfo(message, options = {}) {
  emitToast({ type: "info", message, ...options });
}

export function extractApiErrorMessage(error, fallback = "Request failed.") {
  const data = error?.response?.data;
  if (!data) return fallback;
  if (typeof data === "string") return data;
  if (typeof data.detail === "string") return data.detail;
  if (typeof data.message === "string") return data.message;

  const firstKey = Object.keys(data)[0];
  const firstVal = data[firstKey];
  if (Array.isArray(firstVal) && firstVal.length) {
    return `${firstKey}: ${String(firstVal[0])}`;
  }
  if (typeof firstVal === "string") {
    return `${firstKey}: ${firstVal}`;
  }
  return fallback;
}

