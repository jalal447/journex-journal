import Card from "../ui/Card";

function calculateDiscipline(trades) {
  if (!trades.length) return 0;
  const followed = trades.filter((t) => t.rule_followed).length;
  const psychCompleted = trades.filter((t) => t.emotion_before && t.emotion_after).length;
  const base = (followed / trades.length) * 70;
  const psych = (psychCompleted / trades.length) * 30;
  return Math.round(base + psych);
}

export default function DisciplineScore({ trades = [] }) {
  const score = calculateDiscipline(trades);
  return (
    <Card className="flex flex-col justify-center">
      <p className="text-sm font-semibold">Discipline Score</p>
      <p className="mt-2 text-3xl font-bold text-jx-gold">{score}/100</p>
      <p className="mt-2 text-xs text-white/70">Rule-following and psychology logging consistency</p>
      <div className="mt-3 h-2 rounded bg-white/10">
        <div className="h-full rounded bg-jx-gold transition-all duration-500" style={{ width: `${score}%` }} />
      </div>
    </Card>
  );
}

