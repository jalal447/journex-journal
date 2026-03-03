import api from "./client";

export const authApi = {
  login: (payload) => api.post("/auth/token/", payload),
  refresh: (payload) => api.post("/auth/token/refresh/", payload),
  register: (payload) => api.post("/users/register/", payload),
  me: () => api.get("/users/me/"),
};

export const tradesApi = {
  list: () => api.get("/trades/"),
  create: (payload, headers = {}) => api.post("/trades/", payload, { headers }),
  remove: (id) => api.delete(`/trades/${id}/`),
};

export const analyticsApi = {
  summary: () => api.get("/analytics/dashboard-summary/"),
  winRate: () => api.get("/analytics/win-rate/"),
  avgRr: () => api.get("/analytics/avg-rr/"),
  totalPnl: () => api.get("/analytics/total-pnl/"),
  equityCurve: () => api.get("/analytics/equity-curve/"),
  sessionPerformance: () => api.get("/analytics/session-performance/"),
  pairPerformance: () => api.get("/analytics/pair-performance/"),
  pnlCalendar: () => api.get("/analytics/pnl-calendar/"),
};

export const calculatorsApi = {
  forex: (payload) => api.post("/calculators/forex-position-size/", payload),
  crypto: (payload) => api.post("/calculators/crypto-futures/", payload),
  rr: (payload) => api.post("/calculators/risk-reward/", payload),
};

