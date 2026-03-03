import { NavLink } from "react-router-dom";
import { classNames } from "../../utils/format";

const links = [
  { to: "/app/dashboard", label: "Dashboard" },
  { to: "/app/calculators", label: "Calc" },
  { to: "/app/trades/new", label: "Add" },
  { to: "/app/trades/history", label: "History" },
  { to: "/app/calendar", label: "Calendar" },
  { to: "/app/profile", label: "Profile" },
];

export default function MobileNav() {
  return (
    <nav className="glass fixed bottom-3 left-3 right-3 z-30 rounded-2xl p-2 md:hidden">
      <div className="grid grid-cols-6 gap-1">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              classNames(
                "rounded-lg px-2 py-2 text-center text-xs",
                isActive ? "bg-jx-blue/30 text-white" : "text-white/70"
              )
            }
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
