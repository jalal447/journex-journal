import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import AddTradePage from "./pages/AddTradePage";
import AppCalculatorsPage from "./pages/AppCalculatorsPage";
import CalculatorsPage from "./pages/CalculatorsPage";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import PnlCalendarPage from "./pages/PnlCalendarPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import TradeHistoryPage from "./pages/TradeHistoryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/calculators" element={<CalculatorsPage />} />

      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="calculators" element={<AppCalculatorsPage />} />
        <Route path="trades/new" element={<AddTradePage />} />
        <Route path="trades/history" element={<TradeHistoryPage />} />
        <Route path="calendar" element={<PnlCalendarPage />} />
        <Route path="calender" element={<PnlCalendarPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
