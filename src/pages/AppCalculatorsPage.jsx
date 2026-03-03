import CryptoFuturesCalculator from "../components/calculators/CryptoFuturesCalculator";
import ForexCalculator from "../components/calculators/ForexCalculator";
import RiskRewardCalculator from "../components/calculators/RiskRewardCalculator";

export default function AppCalculatorsPage() {
  return (
    <section className="space-y-4">
      <div className="glass rounded-2xl p-4">
        <p className="text-2xl font-bold">Calculators</p>
        <p className="text-sm text-white/70">Quick risk and position sizing tools for logged-in users.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <ForexCalculator />
        <CryptoFuturesCalculator />
        <RiskRewardCalculator />
      </div>
    </section>
  );
}

