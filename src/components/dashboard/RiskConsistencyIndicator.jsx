import Card from "../ui/Card";

function scoreFromTrades(trades) {
  if (!trades.length) return 0;
  const values = trades.map((t) => Number(t.risk_percent || 0));
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((a, v) => a + (v - avg) ** 2, 0) / values.length;
  const std = Math.sqrt(variance);
  return Math.max(0, Math.min(100, Math.round(100 - std * 30)));
}

export default function RiskConsistencyIndicator({ trades = [] }) {
  const score = scoreFromTrades(trades);
  const ring = `conic-gradient(#00FF88 ${score * 3.6}deg, rgba(255,255,255,0.15) 0deg)`;

  return (
    <Card className="flex flex-col items-center justify-center">
      <p className="text-sm font-semibold">Risk Consistency</p>
      <div className="mt-3 grid h-28 w-28 place-items-center rounded-full p-2" style={{ background: ring }}>
        <div className="grid h-full w-full place-items-center rounded-full bg-jx-black">
          <span className="text-xl font-bold">{score}</span>
        </div>
      </div>
      <p className="mt-2 text-xs text-white/70">Based on risk% stability</p>
    </Card>
  );
}

