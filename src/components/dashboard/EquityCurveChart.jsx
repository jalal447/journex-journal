import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "../ui/Card";

export default function EquityCurveChart({ data = [] }) {
  return (
    <Card className="h-80">
      <p className="mb-3 text-sm font-semibold">Equity Curve</p>
      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00FF88" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#00FF88" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" />
          <XAxis dataKey="date" stroke="#FFFFFF80" />
          <YAxis stroke="#FFFFFF80" />
          <Tooltip
            contentStyle={{
              background: "#0B0F14",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "0.75rem",
            }}
          />
          <Area type="monotone" dataKey="equity" stroke="#00FF88" fill="url(#equityGradient)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

