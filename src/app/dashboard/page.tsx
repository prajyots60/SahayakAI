import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CircleDot,
  LineChart,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

const businessHealthScore = 72;
const businessHealthStatus =
  businessHealthScore >= 75
    ? { label: "Thriving", tone: "text-emerald-600", bg: "bg-emerald-100" }
    : businessHealthScore >= 50
    ? { label: "Stable", tone: "text-amber-600", bg: "bg-amber-100" }
    : { label: "At Risk", tone: "text-rose-600", bg: "bg-rose-100" };

const topRisks = [
  {
    label: "⚠️ High Average Payment Delays",
    prompt:
      "Analyze why my receivables are delayed and suggest immediate actions to reduce the collection cycle.",
  },
  {
    label: "📉 Declining Profit Margin (3 months)",
    prompt:
      "Break down the reasons behind the last 3 months of profit margin decline and prepare a turnaround plan.",
  },
  {
    label: "💸 Low Cash on Hand",
    prompt:
      "Review current liquidity and outline steps to improve cash on hand over the next quarter.",
  },
];

const revenueExpenses = {
  labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  revenue: [48, 52, 55, 60, 58, 63],
  expenses: [36, 38, 37, 41, 43, 46],
};

const netMargin = [14, 13, 11, 9, 10, 12];
const cashOnHand = [24, 23, 19, 18, 22, 26];

const chartSize = { width: 280, height: 120 };

function linePath(data: number[], { width, height }: typeof chartSize) {
  if (data.length === 0) return "";
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = width / Math.max(data.length - 1, 1);

  return data
    .map((point, index) => {
      const x = index * step;
      const normalisedY = (point - min) / range;
      const y = height - normalisedY * height;
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

function Gauge({ score }: { score: number }) {
  const clampedScore = Math.min(Math.max(score, 0), 100);
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedScore / 100) * circumference;

  const gaugeTone =
    clampedScore >= 75
      ? "stroke-emerald-500"
      : clampedScore >= 50
      ? "stroke-amber-500"
      : "stroke-rose-500";

  return (
    <div className="relative flex h-60 w-60 items-center justify-center">
      <svg className="absolute h-full w-full" viewBox="0 0 220 220">
        <circle
          className="stroke-slate-100"
          strokeWidth={20}
          fill="transparent"
          r={radius}
          cx="110"
          cy="110"
        />
        <circle
          className={`${gaugeTone} transition-all duration-700 ease-out`}
          strokeWidth={20}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="110"
          cy="110"
        />
      </svg>
      <div className="z-[1] flex flex-col items-center justify-center">
        <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Score
        </span>
        <span className="text-5xl font-semibold text-slate-900">
          {clampedScore}
        </span>
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
          / 100
        </span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-10">
        <header className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-500">
            Dashboard
          </span>
          <h1 className="text-3xl font-semibold text-slate-900">
            Welcome back, Priya!
          </h1>
          <p className="max-w-2xl text-sm text-slate-500">
            Here’s the pulse of your business today. Review the key movements
            and take confident action with guidance from SahayakAI.
          </p>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-emerald-100 bg-white/95 p-8 shadow-xl shadow-emerald-500/10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500">
                  Your current business health score
                </p>
                <h2 className="text-3xl font-semibold text-slate-900">
                  Stay proactive, not reactive.
                </h2>
                <p className="max-w-sm text-sm text-slate-500">
                  We analyse your cash flow, profitability, risk signals, and
                  vendor behaviour every day to keep you ahead of surprises.
                </p>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${businessHealthStatus.bg} ${businessHealthStatus.tone}`}
                >
                  <CircleDot className="h-3 w-3" /> Status:{" "}
                  {businessHealthStatus.label}
                </span>
              </div>
              <Gauge score={businessHealthScore} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-xl shadow-emerald-500/10">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-500">
                    Module 1 insights
                  </p>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Top 3 areas to focus on
                  </h3>
                </div>
                <Link
                  href="/ai-advisor"
                  className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600 hover:text-emerald-700"
                >
                  View all
                </Link>
              </div>
              <div className="space-y-3">
                {topRisks.map((risk) => (
                  <Link
                    key={risk.label}
                    href={`/ai-advisor?prompt=${encodeURIComponent(
                      risk.prompt
                    )}`}
                    className="group flex items-center justify-between rounded-2xl border border-emerald-100 bg-white/80 px-4 py-4 text-sm text-slate-700 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/70 hover:shadow-md"
                  >
                    <span>{risk.label}</span>
                    <ArrowRight className="h-4 w-4 text-emerald-400 transition group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-100 bg-white/95 p-6 shadow-xl shadow-emerald-500/10">
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-emerald-500">
                <TrendingUp className="h-4 w-4" /> Performance summary
              </div>
              <div className="mt-4 grid gap-4">
                {proofCard(
                  "Revenue vs. Expenses",
                  revenueExpenses.labels,
                  [
                    {
                      data: revenueExpenses.revenue,
                      className: "stroke-emerald-500",
                    },
                    {
                      data: revenueExpenses.expenses,
                      className: "stroke-amber-500",
                    },
                  ],
                  ["Revenue", "Expenses"]
                )}
                {proofCard(
                  "Net Profit Margin (%)",
                  revenueExpenses.labels,
                  [{ data: netMargin, className: "stroke-emerald-500" }],
                  ["Net Margin"]
                )}
                {proofCard(
                  "Cash on Hand (₹Lakh)",
                  revenueExpenses.labels,
                  [{ data: cashOnHand, className: "stroke-emerald-500" }],
                  ["Cash"]
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-3xl border border-emerald-100 bg-white/95 p-8 shadow-xl shadow-emerald-500/10">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-emerald-500">
              <Lightbulb className="h-5 w-5 text-emerald-500" />
              SahayakAI recommends
            </div>
            <h3 className="text-xl font-semibold text-slate-900">
              "I've identified a way to improve your profit margin by 5%."
            </h3>
            <p className="text-sm text-slate-500">
              Your expenses in logistics and vendor rebates present an
              optimisation opportunity this quarter. Would you like a guided
              action plan tailored to your sector?
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                className="rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-6 py-5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-emerald-500/30"
              >
                <Link href="/ai-advisor?prompt=Help%20me%20improve%20profit%20margin%20by%205%20with%20step%20by%20step%20plan">
                  Ask for a plan
                </Link>
              </Button>
              <Button
                variant="outline"
                className="rounded-xl border border-emerald-100 bg-white px-6 py-5 text-sm font-semibold text-emerald-600 hover:bg-emerald-50"
              >
                Dismiss for now
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border border-emerald-100 bg-white/95 p-8 shadow-xl shadow-emerald-500/10">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-emerald-500">
              <LineChart className="h-5 w-5 text-emerald-500" />
              Data sync status
            </div>
            <h3 className="text-xl font-semibold text-slate-900">
              Last data updated for: September 2025
            </h3>
            <p className="text-sm text-slate-500">
              Keep your insights accurate by adding the latest month’s books,
              bank feeds, and sales records. This helps SahayakAI keep your
              projections sharp.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button className="rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-6 py-5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-emerald-500/30">
                + Add new month’s data
              </Button>
              <Button
                variant="outline"
                className="rounded-xl border border-emerald-100 bg-white px-6 py-5 text-sm font-semibold text-emerald-600 hover:bg-emerald-50"
              >
                View data history
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function proofCard(
  title: string,
  labels: string[],
  series: { data: number[]; className: string }[],
  legends: string[]
) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-white via-white to-emerald-50/40 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-base font-semibold text-slate-900">{title}</h4>
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-slate-400">
          {legends.map((legend, index) => (
            <span key={legend} className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  series[index]?.className === "stroke-amber-500"
                    ? "bg-amber-500"
                    : "bg-emerald-500"
                }`}
              />
              {legend}
            </span>
          ))}
        </div>
      </div>
      <div className="relative">
        <svg
          viewBox={`0 0 ${chartSize.width} ${chartSize.height}`}
          className="h-32 w-full"
        >
          <defs>
            <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect
            x="0"
            y="0"
            width={chartSize.width}
            height={chartSize.height}
            rx="12"
            className="fill-white"
          />
          <g className="stroke-slate-100">
            {[0, 1, 2, 3, 4].map((grid) => (
              <line
                key={grid}
                x1="0"
                x2={chartSize.width}
                y1={(chartSize.height / 4) * grid}
                y2={(chartSize.height / 4) * grid}
                strokeWidth={1}
              />
            ))}
          </g>
          {series.map((serie, index) => {
            const path = linePath(serie.data, chartSize);
            if (!path) return null;
            return (
              <path
                key={`${title}-${index}`}
                d={path}
                fill="none"
                strokeWidth={3}
                className={serie.className}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
        <div className="mt-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
          {labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
