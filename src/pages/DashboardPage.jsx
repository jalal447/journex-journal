import { useEffect } from "react";
import DisciplineScore from "../components/dashboard/DisciplineScore";
import EquityCurveChart from "../components/dashboard/EquityCurveChart";
import PairPerformanceBarChart from "../components/dashboard/PairPerformanceBarChart";
import PnlCalendarHeatmap from "../components/dashboard/PnlCalendarHeatmap";
import RiskConsistencyIndicator from "../components/dashboard/RiskConsistencyIndicator";
import SessionPieChart from "../components/dashboard/SessionPieChart";
import FeatureGate from "../components/ui/FeatureGate";
import StatCard from "../components/ui/StatCard";
import { useAppData } from "../hooks/useAppData";
import { formatCurrency, formatPercent } from "../utils/format";

export default function DashboardPage() {
  const { summary, equityCurve, sessionPerformance, pairPerformance, pnlCalendar, trades, loadPrivateData } = useAppData();

  useEffect(() => {
    loadPrivateData();
  }, [loadPrivateData]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Trades" value={summary?.total_trades || 0} hint="Journal Activity" />
        <StatCard title="Win Rate" value={formatPercent(summary?.win_rate || 0)} hint="Execution Quality" trend="up" />
        <StatCard title="Average RR" value={Number(summary?.avg_rr || 0).toFixed(2)} hint="Risk/Reward Profile" />
        <StatCard title="Total PnL" value={formatCurrency(summary?.total_pnl || 0)} trend={Number(summary?.total_pnl || 0) >= 0 ? "up" : "down"} />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <EquityCurveChart data={equityCurve} />
        </div>
        <div className="grid gap-4">
          <RiskConsistencyIndicator trades={trades} />
          <DisciplineScore trades={trades} />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SessionPieChart data={sessionPerformance} />
        <PairPerformanceBarChart data={pairPerformance} />
      </div>

      <FeatureGate title="PnL Calendar Heatmap (Pro)" description="Unlock calendar-level daily behavior diagnostics with Pro.">
        <PnlCalendarHeatmap data={pnlCalendar} />
      </FeatureGate>

    </div>
  );
}
