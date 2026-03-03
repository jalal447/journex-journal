import { Outlet } from "react-router-dom";
import MobileNav from "./MobileNav";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import TrialCountdownBanner from "./TrialCountdownBanner";

export default function AppLayout() {
  return (
    <div className="min-h-screen p-3 md:p-6">
      <div className="mx-auto flex w-full max-w-7xl gap-4">
        <Sidebar />
        <main className="flex-1">
          <Topbar />
          <TrialCountdownBanner />
          <Outlet />
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
