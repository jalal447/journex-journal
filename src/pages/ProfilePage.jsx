import Card from "../components/ui/Card";
import FeatureGate from "../components/ui/FeatureGate";
import { useAuth } from "../hooks/useAuth";

export default function ProfilePage() {
  const { user, isPro } = useAuth();

  return (
    <div className="space-y-4">
      <Card>
        <p className="mb-3 text-lg font-semibold">Profile</p>
        <div className="grid gap-2 text-sm text-white/80 md:grid-cols-2">
          <p>Email: {user?.email}</p>
          <p>Name: {user?.first_name} {user?.last_name}</p>
          <p>Subscription: <span className={isPro ? "text-jx-gold" : "text-white"}>{isPro ? "Pro" : "Free"}</span></p>
          <p>Premium Access: {user?.is_premium ? "Yes" : "No"}</p>
        </div>
      </Card>

      <FeatureGate title="Advanced Profile Metrics (Pro)" description="Unlock deep behavioral insights and export reports with Pro.">
        <Card>
          <p className="text-lg font-semibold">Pro Insights</p>
          <p className="mt-2 text-sm text-white/70">Weekly edge report and behavioral trend snapshots will appear here.</p>
        </Card>
      </FeatureGate>
    </div>
  );
}

