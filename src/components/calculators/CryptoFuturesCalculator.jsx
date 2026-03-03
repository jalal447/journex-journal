import { useState } from "react";
import { calculatorsApi } from "../../api/endpoints";
import { toastSuccess } from "../../utils/toastBus";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";

export default function CryptoFuturesCalculator() {
  const [form, setForm] = useState({
    account_balance: "",
    risk_percent: "",
    entry_price: "",
    stop_loss_price: "",
  });
  const [result, setResult] = useState(null);

  const setField = (key, value) => setForm((p) => ({ ...p, [key]: value }));
  const submit = async (e) => {
    e.preventDefault();
    const { data } = await calculatorsApi.crypto(form);
    setResult(data);
    toastSuccess("Crypto calculation completed.");
  };

  return (
    <Card>
      <p className="mb-3 font-semibold">Crypto Futures Calculator</p>
      <form onSubmit={submit}>
        <Input label="Account Balance" type="number" step="any" value={form.account_balance} onChange={(e) => setField("account_balance", e.target.value)} required />
        <Input label="Risk Percent" type="number" step="any" value={form.risk_percent} onChange={(e) => setField("risk_percent", e.target.value)} required />
        <Input label="Entry Price" type="number" step="any" value={form.entry_price} onChange={(e) => setField("entry_price", e.target.value)} required />
        <Input label="Stop Loss Price" type="number" step="any" value={form.stop_loss_price} onChange={(e) => setField("stop_loss_price", e.target.value)} required />
        <Button type="submit" variant="success">
          Calculate
        </Button>
      </form>
      {result ? (
        <div className="mt-3 text-sm text-white/80">
          <p>Risk Amount: {result.risk_amount}</p>
          <p>Stop Distance %: {result.stop_distance_percent}%</p>
          <p className="font-semibold text-jx-green">Suggested Leverage: {result.suggested_leverage}x</p>
          <p>Position Size: {result.position_size}</p>
          <p>Notional: {result.notional_value}</p>
        </div>
      ) : null}
    </Card>
  );
}
