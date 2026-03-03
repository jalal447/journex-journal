import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Card from "../ui/Card";

const COLORS = ["#00FF88", "#0066FF", "#FFD700", "#FF3B3B", "#A0AEC0"];

export default function SessionPieChart({ data = [] }) {
  return (
    <Card className="h-80">
      <p className="mb-3 text-sm font-semibold">Session Performance</p>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie data={data} dataKey="total_trades" nameKey="session" outerRadius={95} innerRadius={58} label>
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "#0B0F14",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "0.75rem",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}

