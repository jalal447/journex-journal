import { Link } from "react-router-dom";
import AnimatedCounter from "../components/ui/AnimatedCounter";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Reveal from "../components/ui/Reveal";

export default function LandingPage() {
  const stats = [
    { label: "Trades Logged", value: 125000, suffix: "+" },
    { label: "Avg. Win-Rate Lift", value: 18, suffix: "%" },
    { label: "Active Traders", value: 9200, suffix: "+" },
    { label: "Daily Journal Entries", value: 36000, suffix: "+" },
  ];

  const features = [
    {
      title: "Psychology Tracking",
      body: "Track emotion before and after each trade to spot behavior patterns that damage edge.",
    },
    {
      title: "Performance Analytics",
      body: "See win rate, RR quality, equity curve, pair/session edge, and PnL calendar in one view.",
    },
    {
      title: "Rule Discipline Score",
      body: "Measure rule-following consistency and identify drift before it hurts your account.",
    },
    {
      title: "Screenshot Journal",
      body: "Attach chart snapshots to every trade for cleaner review loops and faster improvement.",
    },
    {
      title: "Free + Pro Workflow",
      body: "Start with the free tier and unlock advanced behavioral analytics as your process matures.",
    },
    {
      title: "Execution Clarity",
      body: "Stop guessing. Audit your decisions and build repeatable setups with data-backed feedback.",
    },
  ];

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex items-center justify-between">
          <img src="/journex-logo.svg" alt="Journex" className="h-10" />
          <div className="flex gap-2">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="primary">Start Free</Button>
            </Link>
          </div>
        </header>

        <Reveal delay={50}>
          <section className="mb-8 rounded-3xl border border-jx-green/30 bg-grid-fade p-8 shadow-neon md:p-12">
          <p className="text-sm uppercase tracking-[0.2em] text-jx-green">Trading Journal SaaS</p>
          <h1 className="mt-2 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
            Journal Your Trades. Master Your Edge.
          </h1>
          <p className="mt-4 max-w-2xl text-white/75">
            Built for serious traders who want to convert execution data into consistent growth. Log, review, adapt.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/register">
              <Button variant="success" className="px-6 py-3 text-base">
                Start Free
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="primary" className="px-6 py-3 text-base">
                Get Demo Access
              </Button>
            </Link>
            <Link to="/calculators">
              <Button variant="ghost" className="px-6 py-3 text-base">
                Try Calculators
              </Button>
            </Link>
          </div>
          </section>
        </Reveal>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, idx) => (
            <Reveal key={item.label} delay={100 + idx * 90}>
              <Card className="border border-jx-green/20">
              <p className="text-3xl font-black text-jx-green">
                <AnimatedCounter value={item.value} suffix={item.suffix} />
              </p>
              <p className="mt-1 text-sm text-white/70">{item.label}</p>
              </Card>
            </Reveal>
          ))}
        </section>

        <Reveal delay={120}>
          <section className="mb-8">
          <p className="mb-4 text-xl font-bold">Feature Grid</p>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {features.map((item, idx) => (
              <Reveal key={item.title} delay={130 + idx * 70}>
                <Card className="border border-white/10 hover:border-jx-green/50">
                <p className="text-lg font-semibold text-jx-white">{item.title}</p>
                <p className="mt-2 text-sm text-white/70">{item.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
          </section>
        </Reveal>

        <Reveal delay={160}>
          <section className="mb-8 rounded-3xl border border-jx-green/25 p-6 md:p-8">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-xl font-bold">Calculator Preview</p>
            <Link to="/calculators">
              <Button variant="ghost">Open Full Toolkit</Button>
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Reveal delay={180}>
              <Card className="border border-jx-blue/30">
              <p className="text-sm uppercase text-jx-blue">Forex Position Size</p>
              <p className="mt-3 text-sm text-white/70">Balance: $10,000 | Risk: 1% | SL: 25 pips</p>
              <p className="mt-2 text-2xl font-bold text-jx-green">0.40 Lots</p>
              </Card>
            </Reveal>
            <Reveal delay={260}>
              <Card className="border border-jx-gold/30">
              <p className="text-sm uppercase text-jx-gold">Crypto Futures</p>
              <p className="mt-3 text-sm text-white/70">Balance: $5,000 | Leverage: 10x</p>
              <p className="mt-2 text-2xl font-bold text-jx-green">$420 Margin</p>
              </Card>
            </Reveal>
            <Reveal delay={340}>
              <Card className="border border-jx-green/30">
              <p className="text-sm uppercase text-jx-green">Risk Reward</p>
              <p className="mt-3 text-sm text-white/70">Entry: 1.1020 | SL: 1.0990 | TP: 1.1100</p>
              <p className="mt-2 text-2xl font-bold text-jx-green">RR 2.67</p>
              </Card>
            </Reveal>
          </div>
          </section>
        </Reveal>

        <Reveal delay={200}>
          <section className="rounded-3xl border border-jx-green/30 p-8 text-center shadow-neon">
          <p className="text-3xl font-black">Ready to trade like a pro?</p>
          <p className="mx-auto mt-2 max-w-2xl text-white/70">
            Turn scattered notes into a high-performance trading system with measurable discipline and clearer execution.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link to="/register">
              <Button variant="success" className="px-6 py-3 text-base">
                Create Free Account
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="primary" className="px-6 py-3 text-base">
                Login to Dashboard
              </Button>
            </Link>
          </div>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
