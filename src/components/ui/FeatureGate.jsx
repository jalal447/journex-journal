import Card from "./Card";
import Button from "./Button";
import { useAuth } from "../../hooks/useAuth";

export default function FeatureGate({ children, title = "Pro Feature", description = "Upgrade to Pro to unlock this module." }) {
  const { isPro } = useAuth();
  if (isPro) return children;

  return (
    <Card className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative z-10">
        <p className="text-lg font-semibold text-jx-gold">{title}</p>
        <p className="mt-1 text-sm text-white/70">{description}</p>
        <Button className="mt-4" variant="success">
          Upgrade to Pro
        </Button>
      </div>
    </Card>
  );
}

