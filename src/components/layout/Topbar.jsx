import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../ui/Button";

export default function Topbar() {
  const { user, logout, hasPaidPro, inTrial } = useAuth();
  const navigate = useNavigate();

  const badge = hasPaidPro ? "Pro" : inTrial ? "Trial" : "Free";
  const badgeClass = hasPaidPro
    ? "bg-jx-gold/20 text-jx-gold"
    : inTrial
      ? "bg-jx-blue/20 text-jx-blue"
      : "bg-white/10 text-white/70";

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="glass mb-4 flex items-center justify-between rounded-2xl p-4">
      <div>
        <p className="text-xs uppercase tracking-wider text-white/60">Trading Journal Platform</p>
        <p className="text-lg font-semibold">
          Welcome, <span className="text-jx-green">{user?.first_name || user?.email}</span>
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}>{badge}</span>
        <Button variant="ghost" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
}
