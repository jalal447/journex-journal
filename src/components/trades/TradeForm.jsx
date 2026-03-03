import { useState } from "react";
import { tradesApi } from "../../api/endpoints";
import { useAuth } from "../../hooks/useAuth";
import { toastSuccess } from "../../utils/toastBus";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Select from "../ui/Select";

const directionOptions = [
  { value: "buy", label: "Buy" },
  { value: "sell", label: "Sell" },
];

const marketOptions = [
  { value: "forex", label: "Forex" },
  { value: "crypto", label: "Crypto" },
];

const outcomeOptions = [
  { value: "win", label: "Win" },
  { value: "loss", label: "Loss" },
  { value: "breakeven", label: "Breakeven" },
];

export default function TradeForm({ onCreated }) {
  const { isPro } = useAuth();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    market_type: "forex",
    pair: "",
    direction: "buy",
    entry_price: "",
    stop_loss: "",
    take_profit: "",
    position_size: "",
    risk_percent: "",
    outcome: "win",
    session: "",
    strategy_tag: "",
    emotion_before: "",
    emotion_after: "",
    rule_followed: true,
    notes: "",
    trade_date: new Date().toISOString().slice(0, 10),
    screenshot: null,
  });

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "screenshot") {
          if (value) fd.append(key, value);
        } else {
          fd.append(key, value);
        }
      });
      await tradesApi.create(fd, { "Content-Type": "multipart/form-data" });
      setForm((prev) => ({ ...prev, pair: "", notes: "", screenshot: null }));
      toastSuccess("Trade saved.");
      onCreated?.();
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to create trade.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <p className="mb-4 text-lg font-semibold">Log New Trade</p>
      <form className="grid grid-cols-1 gap-3 md:grid-cols-2" onSubmit={handleSubmit}>
        <Select label="Market Type" value={form.market_type} options={marketOptions} onChange={(e) => setField("market_type", e.target.value)} />
        <Input label="Pair" value={form.pair} onChange={(e) => setField("pair", e.target.value)} placeholder="EURUSD / BTCUSDT" required />
        <Select label="Direction" value={form.direction} options={directionOptions} onChange={(e) => setField("direction", e.target.value)} />
        <Select label="Outcome" value={form.outcome} options={outcomeOptions} onChange={(e) => setField("outcome", e.target.value)} />
        <Input label="Entry Price" type="number" step="any" value={form.entry_price} onChange={(e) => setField("entry_price", e.target.value)} required />
        <Input label="Stop Loss" type="number" step="any" value={form.stop_loss} onChange={(e) => setField("stop_loss", e.target.value)} required />
        <Input label="Take Profit" type="number" step="any" value={form.take_profit} onChange={(e) => setField("take_profit", e.target.value)} required />
        <Input label="Position Size" type="number" step="any" value={form.position_size} onChange={(e) => setField("position_size", e.target.value)} required />
        <Input label="Risk %" type="number" step="any" value={form.risk_percent} onChange={(e) => setField("risk_percent", e.target.value)} required />
        <Input label="Session" value={form.session} onChange={(e) => setField("session", e.target.value)} placeholder="London / NY / Asia" />
        <Input label="Strategy Tag" value={form.strategy_tag} onChange={(e) => setField("strategy_tag", e.target.value)} placeholder="Breakout / Pullback" />
        <Input label="Trade Date" type="date" value={form.trade_date} onChange={(e) => setField("trade_date", e.target.value)} required />
        <Input label="Emotion Before" value={form.emotion_before} onChange={(e) => setField("emotion_before", e.target.value)} />
        <Input label="Emotion After" value={form.emotion_after} onChange={(e) => setField("emotion_after", e.target.value)} />
        <label className="col-span-full flex items-center gap-2 text-sm text-white/80">
          <input type="checkbox" checked={form.rule_followed} onChange={(e) => setField("rule_followed", e.target.checked)} />
          Rule Followed
        </label>
        <label className="col-span-full block">
          <span className="mb-1 block text-xs text-white/70">Notes</span>
          <textarea
            className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none ring-jx-blue transition focus:ring-2"
            rows={4}
            value={form.notes}
            onChange={(e) => setField("notes", e.target.value)}
          />
        </label>
        <label className="col-span-full block">
          <span className="mb-1 block text-xs text-white/70">
            Screenshot Upload {!isPro ? "(Pro Only)" : ""}
          </span>
          <input
            type="file"
            accept="image/*"
            disabled={!isPro}
            onChange={(e) => setField("screenshot", e.target.files?.[0] || null)}
            className="w-full rounded-xl border border-dashed border-white/20 bg-black/30 p-3 text-sm text-white/70"
          />
        </label>
        {error ? <p className="col-span-full text-sm text-jx-red">{error}</p> : null}
        <div className="col-span-full">
          <Button variant="success" type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Save Trade"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
