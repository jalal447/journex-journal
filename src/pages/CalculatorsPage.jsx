import { Link } from "react-router-dom";
import CryptoFuturesCalculator from "../components/calculators/CryptoFuturesCalculator";
import ForexCalculator from "../components/calculators/ForexCalculator";
import RiskRewardCalculator from "../components/calculators/RiskRewardCalculator";
import Button from "../components/ui/Button";

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-2xl font-bold">Trading Calculators</p>
          <Link to="/">
            <Button variant="ghost">Back</Button>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <ForexCalculator />
          <CryptoFuturesCalculator />
          <RiskRewardCalculator />
        </div>
      </div>
    </div>
  );
}

