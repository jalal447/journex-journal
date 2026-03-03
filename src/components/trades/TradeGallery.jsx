import Button from "../ui/Button";
import Card from "../ui/Card";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
const API_ORIGIN = API_BASE.replace(/\/api\/?$/, "");

function resolveImageUrl(path) {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/")) return `${API_ORIGIN}${path}`;
  return `${API_ORIGIN}/${path}`;
}

function outcomeMeta(outcome) {
  if (outcome === "win") return { label: "Win", dot: "bg-jx-green", text: "text-jx-green" };
  if (outcome === "loss") return { label: "Lose", dot: "bg-jx-red", text: "text-jx-red" };
  return { label: "BE", dot: "bg-white/40", text: "text-white/80" };
}

function directionMeta(direction) {
  return direction === "buy"
    ? { label: "Long", cls: "bg-jx-green/20 text-jx-green" }
    : { label: "Short", cls: "bg-jx-red/20 text-jx-red" };
}

function formatTradeDate(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function PreviewImage({ trade }) {
  if (trade.screenshot) {
    return (
      <img
        src={resolveImageUrl(trade.screenshot)}
        alt={`${trade.pair} setup`}
        className="h-32 w-full rounded-t-2xl object-cover"
      />
    );
  }
  return (
    <div className="h-32 w-full rounded-t-2xl border-b border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01)),repeating-linear-gradient(0deg,rgba(255,255,255,0.06),rgba(255,255,255,0.06)_1px,transparent_1px,transparent_24px),repeating-linear-gradient(90deg,rgba(255,255,255,0.04),rgba(255,255,255,0.04)_1px,transparent_1px,transparent_48px)]">
      <div className="mx-4 mt-7 h-0.5 bg-jx-blue/70" />
      <div className="mx-4 mt-4 h-0.5 bg-jx-blue/70" />
      <div className="mx-4 mt-4 h-0.5 bg-jx-blue/70" />
      <div className="mx-16 mt-4 h-8 rounded-sm border border-jx-green/30 bg-jx-green/20" />
      <div className="mx-10 -mt-3 h-6 rounded-sm border border-jx-red/30 bg-jx-red/20" />
    </div>
  );
}

export default function TradeGallery({ trades = [], onDelete }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {trades.map((trade) => {
        const outcome = outcomeMeta(trade.outcome);
        const direction = directionMeta(trade.direction);
        return (
          <Card key={trade.id} className="overflow-hidden p-0">
            <PreviewImage trade={trade} />
            <div className="p-3">
              <p className="text-xl font-bold tracking-wide">{trade.pair}</p>
              <p className="mt-1 truncate text-sm text-white/70">{formatTradeDate(trade.created_at || trade.trade_date)}</p>
              <div className={`mt-2 inline-flex rounded-md px-2 py-0.5 text-sm font-medium ${direction.cls}`}>
                {direction.label}
              </div>
              <p className={`mt-2 text-xl font-semibold ${Number(trade.pnl) >= 0 ? "text-jx-green" : "text-jx-red"}`}>
                {Number(trade.pnl) >= 0 ? "+" : ""}
                {Number(trade.pnl).toFixed(2)}
              </p>
              <div className="mt-1 flex items-center gap-2 text-sm">
                <span className={`h-3 w-3 rounded-full ${outcome.dot}`} />
                <span className={outcome.text}>{outcome.label}</span>
              </div>
              <div className="mt-3">
                <Button variant="danger" className="px-3 py-1 text-xs" onClick={() => onDelete?.(trade.id)}>
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
      {!trades.length ? <p className="col-span-full text-sm text-white/60">No trades logged yet.</p> : null}
    </div>
  );
}
