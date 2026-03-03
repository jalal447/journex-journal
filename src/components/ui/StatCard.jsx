import Card from "./Card";
import { classNames } from "../../utils/format";

export default function StatCard({ title, value, hint, trend = "neutral" }) {
  const trendStyle = {
    up: "text-jx-green",
    down: "text-jx-red",
    neutral: "text-jx-gold",
  };
  return (
    <Card>
      <p className="text-xs uppercase tracking-wider text-white/60">{title}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
      {hint ? <p className={classNames("mt-1 text-xs", trendStyle[trend])}>{hint}</p> : null}
    </Card>
  );
}

