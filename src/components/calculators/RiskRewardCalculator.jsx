import { useState } from "react";
import { calculatorsApi } from "../../api/endpoints";
import { toastSuccess } from "../../utils/toastBus";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";

export default function RiskRewardCalculator() {
  const [form, setForm] = useState({ entry_price: "", stop_loss: "", take_profit: "" });
  const [result, setResult] = useState(null);

  const setField = (key, value) => setForm((p) => ({ ...p, [key]: value }));
  const submit = async (e) => {
    e.preventDefault();
    const { data } = await calculatorsApi.rr(form);
    setResult(data);
    toastSuccess("Risk-reward calculation completed.");
  };

  return (
    <Card>
      <p className="mb-3 font-semibold">Risk Reward Calculator</p>
      <form onSubmit={submit}>
        <Input label="Entry Price" type="number" step="any" value={form.entry_price} onChange={(e) => setField("entry_price", e.target.value)} required />
        <Input label="Stop Loss" type="number" step="any" value={form.stop_loss} onChange={(e) => setField("stop_loss", e.target.value)} required />
        <Input label="Take Profit" type="number" step="any" value={form.take_profit} onChange={(e) => setField("take_profit", e.target.value)} required />
        <Button type="submit" variant="success">
          Calculate
        </Button>
      </form>
      {result ? (
        <div className="mt-3 text-sm text-white/80">
          <p>Risk: {result.risk}</p>
          <p>Reward: {result.reward}</p>
          <p>RR: {result.rr}</p>
        </div>
      ) : null}
    </Card>
  );
}
