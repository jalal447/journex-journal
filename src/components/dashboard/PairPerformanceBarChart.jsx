import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "../ui/Card";

export default function PairPerformanceBarChart({ data = [] }) {
  return (
    <Card className="h-80">
      <p className="mb-3 text-sm font-semibold">Pair Performance</p>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" />
          <XAxis dataKey="pair" stroke="#FFFFFF80" />
          <YAxis stroke="#FFFFFF80" />
          <Tooltip
            contentStyle={{
              background: "#0B0F14",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "0.75rem",
            }}
          />
          <Bar dataKey="total_pnl" fill="#0066FF" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

