import Button from "../ui/Button";
import Card from "../ui/Card";
import { formatCurrency } from "../../utils/format";

export default function TradeTable({ trades = [], onDelete }) {
  return (
    <Card className="p-0 md:p-0">
      <div className="p-4 md:p-5">
        <p className="mb-4 text-lg font-semibold">Trade History</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-white/60">
                <th className="pb-2">Date</th>
                <th className="pb-2">Pair</th>
                <th className="pb-2">Dir</th>
                <th className="pb-2">Outcome</th>
                <th className="pb-2">RR</th>
                <th className="pb-2">PnL</th>
                <th className="pb-2">Session</th>
                <th className="pb-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => (
                <tr key={trade.id} className="border-b border-white/5 text-white/85">
                  <td className="py-2">{trade.trade_date}</td>
                  <td className="py-2 font-semibold">{trade.pair}</td>
                  <td className="py-2 uppercase">{trade.direction}</td>
                  <td className={`py-2 capitalize ${trade.outcome === "win" ? "text-jx-green" : trade.outcome === "loss" ? "text-jx-red" : "text-jx-gold"}`}>
                    {trade.outcome}
                  </td>
                  <td className="py-2">{trade.rr}</td>
                  <td className={`py-2 ${Number(trade.pnl) >= 0 ? "text-jx-green" : "text-jx-red"}`}>{formatCurrency(trade.pnl)}</td>
                  <td className="py-2">{trade.session || "-"}</td>
                  <td className="py-2">
                    <Button variant="danger" className="px-3 py-1 text-xs" onClick={() => onDelete?.(trade.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!trades.length ? <p className="mt-4 text-sm text-white/60">No trades logged yet.</p> : null}
      </div>
    </Card>
  );
}
