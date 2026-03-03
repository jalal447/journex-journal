import { useEffect, useMemo, useState } from "react";
import { tradesApi } from "../api/endpoints";
import TradeGallery from "../components/trades/TradeGallery";
import TradeTable from "../components/trades/TradeTable";
import Button from "../components/ui/Button";
import { useAppData } from "../hooks/useAppData";
import { toastSuccess } from "../utils/toastBus";

export default function TradeHistoryPage() {
  const { trades, refreshTrades, refreshAnalytics } = useAppData();
  const [view, setView] = useState("gallery");
  const [query, setQuery] = useState("");
  const [outcomeFilter, setOutcomeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    refreshTrades();
  }, [refreshTrades]);

  const filteredSortedTrades = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = [...trades];

    if (outcomeFilter !== "all") {
      rows = rows.filter((t) => String(t.outcome) === outcomeFilter);
    }

    if (q) {
      rows = rows.filter((t) => {
        const bag = [
          t.pair,
          t.session,
          t.strategy_tag,
          t.notes,
          t.direction,
          t.outcome,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return bag.includes(q);
      });
    }

    rows.sort((a, b) => {
      if (sortBy === "oldest") {
        return new Date(a.created_at || a.trade_date).getTime() - new Date(b.created_at || b.trade_date).getTime();
      }
      if (sortBy === "pnl_high") return Number(b.pnl) - Number(a.pnl);
      if (sortBy === "pnl_low") return Number(a.pnl) - Number(b.pnl);
      if (sortBy === "rr_high") return Number(b.rr) - Number(a.rr);
      if (sortBy === "rr_low") return Number(a.rr) - Number(b.rr);
      return new Date(b.created_at || b.trade_date).getTime() - new Date(a.created_at || a.trade_date).getTime();
    });
    return rows;
  }, [trades, query, outcomeFilter, sortBy]);

  const onDelete = async (id) => {
    await tradesApi.remove(id);
    await Promise.all([refreshTrades(), refreshAnalytics()]);
    toastSuccess("Trade deleted.");
  };

  return (
    <section className="glass rounded-3xl p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-3xl font-bold tracking-tight">Trades</h2>
      </div>

      <div className="mb-4 grid gap-2 md:grid-cols-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search pair, session, strategy, notes..."
          className="rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:border-jx-blue"
        />
        <select
          value={outcomeFilter}
          onChange={(e) => setOutcomeFilter(e.target.value)}
          className="rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:border-jx-blue"
        >
          <option value="all">All outcomes</option>
          <option value="win">Win</option>
          <option value="loss">Loss</option>
          <option value="breakeven">Breakeven</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-sm outline-none focus:border-jx-blue"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="pnl_high">PnL high to low</option>
          <option value="pnl_low">PnL low to high</option>
          <option value="rr_high">RR high to low</option>
          <option value="rr_low">RR low to high</option>
        </select>
      </div>

      <div className="mb-6 flex items-center gap-2">
        <Button
          variant="ghost"
          className={view === "gallery" ? "bg-white/15 text-white" : "text-white/70"}
          onClick={() => setView("gallery")}
        >
          Gallery
        </Button>
        <Button
          variant="ghost"
          className={view === "table" ? "bg-white/15 text-white" : "text-white/70"}
          onClick={() => setView("table")}
        >
          All trades
        </Button>
      </div>

      {view === "gallery" ? (
        <TradeGallery trades={filteredSortedTrades} onDelete={onDelete} />
      ) : (
        <TradeTable trades={filteredSortedTrades} onDelete={onDelete} />
      )}
    </section>
  );
}
