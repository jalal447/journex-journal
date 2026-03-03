import { useEffect, useMemo, useState } from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { useAppData } from "../hooks/useAppData";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function monthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function parseMonthKey(key) {
  const [year, month] = key.split("-").map(Number);
  return new Date(year, month - 1, 1);
}

function nextMonthKey(key, step) {
  const date = parseMonthKey(key);
  date.setMonth(date.getMonth() + step);
  return monthKey(date);
}

function cellClass(pnl) {
  if (pnl > 0) return "border-jx-green/40 bg-jx-green/20";
  if (pnl < 0) return "border-jx-red/40 bg-jx-red/20";
  return "border-white/10 bg-white/5";
}

export default function PnlCalendarPage() {
  const { pnlCalendar, refreshAnalytics } = useAppData();
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    refreshAnalytics();
  }, [refreshAnalytics]);

  const availableMonths = useMemo(() => {
    const months = Array.from(
      new Set(
        pnlCalendar.map((d) => {
          const dt = new Date(d.date);
          return monthKey(dt);
        })
      )
    ).sort();
    return months;
  }, [pnlCalendar]);

  useEffect(() => {
    if (!selectedMonth && availableMonths.length) {
      setSelectedMonth(availableMonths[availableMonths.length - 1]);
    }
  }, [availableMonths, selectedMonth]);

  const monthDate = selectedMonth ? parseMonthKey(selectedMonth) : new Date();
  const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const lastDay = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
  const leading = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const pnlByDate = useMemo(() => {
    const map = new Map();
    pnlCalendar.forEach((d) => map.set(d.date, Number(d.total_pnl)));
    return map;
  }, [pnlCalendar]);

  const cells = [];
  for (let i = 0; i < leading; i += 1) {
    cells.push({ key: `empty-${i}`, empty: true });
  }
  for (let day = 1; day <= totalDays; day += 1) {
    const iso = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    cells.push({
      key: iso,
      day,
      pnl: pnlByDate.get(iso) || 0,
      hasTrade: pnlByDate.has(iso),
      iso,
    });
  }

  const monthTotal = cells.reduce((acc, c) => acc + (c.pnl || 0), 0);
  const tradableDays = cells.filter((c) => c.hasTrade).length;

  return (
    <section className="space-y-4">
      <Card>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-2xl font-bold">PnL Calendar</p>
            <p className="text-sm text-white/70">Daily profit and loss view for logged-in users.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => setSelectedMonth((m) => nextMonthKey(m || monthKey(new Date()), -1))}>
              Prev
            </Button>
            <p className="min-w-44 text-center text-sm font-semibold">
              {monthDate.toLocaleString("en-US", { month: "long", year: "numeric" })}
            </p>
            <Button variant="ghost" onClick={() => setSelectedMonth((m) => nextMonthKey(m || monthKey(new Date()), 1))}>
              Next
            </Button>
          </div>
        </div>

        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-xs text-white/70">Month Total</p>
            <p className={`text-xl font-bold ${monthTotal >= 0 ? "text-jx-green" : "text-jx-red"}`}>
              {monthTotal >= 0 ? "+" : ""}
              {monthTotal.toFixed(2)}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-xs text-white/70">Trade Days</p>
            <p className="text-xl font-bold">{tradableDays}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <p className="text-xs text-white/70">Legend</p>
            <p className="text-xs text-white/80">Green = profit, Red = loss, Gray = no-trade day</p>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {WEEK_DAYS.map((d) => (
            <div key={d} className="py-1 text-center text-xs font-semibold text-white/60">
              {d}
            </div>
          ))}
          {cells.map((cell) =>
            cell.empty ? (
              <div key={cell.key} className="h-20 rounded-lg border border-transparent" />
            ) : (
              <div key={cell.key} className={`h-20 rounded-lg border p-2 ${cellClass(cell.pnl)}`}>
                <p className="text-xs text-white/80">{cell.day}</p>
                <p className={`mt-2 text-sm font-semibold ${cell.pnl >= 0 ? "text-jx-green" : "text-jx-red"}`}>
                  {cell.hasTrade ? `${cell.pnl >= 0 ? "+" : ""}${cell.pnl.toFixed(1)}` : "-"}
                </p>
              </div>
            )
          )}
        </div>
      </Card>
    </section>
  );
}

