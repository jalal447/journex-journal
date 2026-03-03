import { NavLink } from "react-router-dom";
import { classNames } from "../../utils/format";

const links = [
  { to: "/app/dashboard", label: "Dashboard" },
  { to: "/app/calculators", label: "Calculators" },
  { to: "/app/trades/new", label: "Add Trade" },
  { to: "/app/trades/history", label: "Trade History" },
  { to: "/app/calendar", label: "PnL Calendar" },
  { to: "/app/profile", label: "Profile" },
];

export default function Sidebar() {
  return (
    <aside className="glass hidden w-64 rounded-2xl p-4 md:block">
      <img src="/journex-logo.svg" alt="Journex" className="mb-6 h-9" />
      <nav className="space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              classNames(
                "block rounded-lg px-3 py-2 text-sm transition",
                isActive ? "bg-jx-blue/25 text-jx-white shadow-neon" : "text-white/75 hover:bg-white/10 hover:text-white"
              )
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
