import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

function formatRemaining(ms) {
  if (ms <= 0) return "00d 00h 00m 00s";
  const totalSec = Math.floor(ms / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;
  return `${String(days).padStart(2, "0")}d ${String(hours).padStart(2, "0")}h ${String(mins).padStart(2, "0")}m ${String(secs).padStart(2, "0")}s`;
}

export default function TrialCountdownBanner() {
  const { inTrial, hasPaidPro, trialEndMs, trialDays } = useAuth();
  const [nowMs, setNowMs] = useState(Date.now());

  useEffect(() => {
    if (!inTrial || hasPaidPro || !trialEndMs) return undefined;
    const timer = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [inTrial, hasPaidPro, trialEndMs]);

  const remaining = useMemo(() => {
    if (!trialEndMs) return 0;
    return Math.max(0, trialEndMs - nowMs);
  }, [trialEndMs, nowMs]);

  if (!inTrial || hasPaidPro || !trialEndMs) return null;

  return (
    <div className="mb-4 rounded-2xl border border-jx-gold/40 bg-jx-gold/10 px-4 py-3">
      <p className="text-sm">
        Free trial ends in <span className="font-bold text-jx-gold">{formatRemaining(remaining)}</span> ({trialDays}-day trial)
      </p>
    </div>
  );
}

