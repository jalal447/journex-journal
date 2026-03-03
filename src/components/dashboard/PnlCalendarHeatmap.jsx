import Card from "../ui/Card";

function intensity(pnl) {
  if (pnl > 0) return "bg-jx-green/60";
  if (pnl < 0) return "bg-jx-red/60";
  return "bg-white/10";
}

export default function PnlCalendarHeatmap({ data = [] }) {
  return (
    <Card>
      <p className="mb-3 text-sm font-semibold">PnL Calendar Heatmap</p>
      <div className="grid grid-cols-7 gap-2">
        {data.slice(-35).map((d) => (
          <div key={d.date} className={`rounded-lg p-2 text-center text-xs ${intensity(d.total_pnl)}`}>
            <p className="text-white/80">{String(d.date).slice(5)}</p>
            <p className="font-semibold">{Number(d.total_pnl).toFixed(0)}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

