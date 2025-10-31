import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  dashboardNavSections,
  type DashboardNavSection,
} from "@/components/dashboard/nav-data";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  CheckCircle2,
  CircleDot,
  Clock,
  DownloadCloud,
  Factory,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const businessHealthScore = 78;
const businessHealthStatus =
  businessHealthScore >= 80
    ? { label: "Thriving", tone: "text-emerald-600", bg: "bg-emerald-100" }
    : businessHealthScore >= 60
    ? { label: "Steady", tone: "text-amber-600", bg: "bg-amber-100" }
    : { label: "At Risk", tone: "text-rose-600", bg: "bg-rose-100" };

type ChangeDirection = "up" | "down" | "steady";

const statCards: {
  title: string;
  icon: LucideIcon;
  metric: string;
  suffix?: string;
  subtext: string;
  change: string;
  changeDirection: ChangeDirection;
  sparkline: number[];
}[] = [
  {
    title: "Trust Score",
    icon: ShieldCheck,
    metric: businessHealthScore.toString(),
    suffix: "/ 100",
    subtext: "Predictive MSME grade",
    change: "+4.3 pts vs last month",
    changeDirection: "up",
    sparkline: [64, 66, 68, 71, 74, 78],
  },
  {
    title: "Cash Runway",
    icon: Wallet,
    metric: "4.5",
    suffix: " months",
    subtext: "₹38L cash on hand",
    change: "+18 days added",
    changeDirection: "up",
    sparkline: [3.2, 3.4, 3.6, 3.9, 4.2, 4.5],
  },
  {
    title: "Receivable Risk",
    icon: AlertTriangle,
    metric: "12%",
    subtext: "Invoices likely to delay",
    change: "-4% risk vs last week",
    changeDirection: "down",
    sparkline: [19, 18, 16, 15, 13, 12],
  },
  {
    title: "Revenue Momentum",
    icon: TrendingUp,
    metric: "₹9.8L",
    subtext: "Last 30 days net sales",
    change: "+6.2% growth",
    changeDirection: "up",
    sparkline: [7.4, 7.8, 8.1, 8.6, 9.1, 9.8],
  },
];

const aiCoachPrompts = [
  {
    title: "Boost Q4 margins by 3%",
    prompt:
      "Diagnose expense leakages in logistics and design a negotiation playbook.",
    tag: "Finance",
  },
  {
    title: "Accelerate collections cycle",
    prompt:
      "Draft a three-touch follow-up journey for clients beyond 30 days aging.",
    tag: "Receivables",
  },
  {
    title: "Prep for festive demand",
    prompt:
      "Plan inventory buffer and marketing bursts for the Diwali sales window.",
    tag: "Growth",
  },
];

const upcomingCompliance = [
  {
    title: "GST filing – GSTR-3B",
    due: "Oct 20, 2025",
    owner: "Finance team",
    status: "due-soon" as const,
  },
  {
    title: "PF & ESI remittance",
    due: "Oct 15, 2025",
    owner: "HR & Payroll",
    status: "urgent" as const,
  },
  {
    title: "MSME Udyam renewal",
    due: "Nov 02, 2025",
    owner: "Compliance desk",
    status: "planned" as const,
  },
];

const receivables = [
  {
    client: "Aarav Retail LLP",
    amount: "₹4.8L",
    due: "Oct 18, 2025",
    probability: 82,
    aging: "45 days",
    risk: "high" as const,
  },
  {
    client: "Namma Grocers",
    amount: "₹3.1L",
    due: "Oct 25, 2025",
    probability: 58,
    aging: "29 days",
    risk: "medium" as const,
  },
  {
    client: "Orbit Engineers",
    amount: "₹2.6L",
    due: "Nov 04, 2025",
    probability: 38,
    aging: "12 days",
    risk: "low" as const,
  },
];

const investorSignals = [
  {
    fund: "Pragati MSME Trust",
    focus: "Working capital lines",
    interest: "Requested dashboard invite",
  },
  {
    fund: "Greenstep Angels",
    focus: "Climate-positive manufacturing",
    interest: "Shortlisted for pitch day",
  },
];

type PerformanceSeries = { name: string; data: number[]; className: string };
type PerformanceBlock = {
  title: string;
  subtitle?: string;
  labels: string[];
  series: PerformanceSeries[];
};

const performanceBlocks: PerformanceBlock[] = [
  {
    title: "Revenue vs Expenses",
    subtitle: "₹ in lakhs",
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    series: [
      {
        name: "Revenue",
        data: [46, 51, 55, 59, 63, 68],
        className: "stroke-emerald-500",
      },
      {
        name: "Expenses",
        data: [33, 36, 37, 39, 41, 43],
        className: "stroke-amber-500",
      },
    ],
  },
  {
    title: "Net Profit Margin",
    subtitle: "% trend",
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    series: [
      {
        name: "Net Margin",
        data: [12, 11.5, 11, 10.8, 11.6, 12.4],
        className: "stroke-emerald-500",
      },
    ],
  },
  {
    title: "Operating Cash Flow",
    subtitle: "₹ in lakhs",
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    series: [
      {
        name: "Cash Flow",
        data: [8.2, 7.6, 6.4, 7.1, 7.8, 8.9],
        className: "stroke-emerald-500",
      },
    ],
  },
];

const sparklineSize = { width: 120, height: 48 };
const performanceChartSize = { width: 320, height: 140 };

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-50 to-blue-50/30">
      <div className="flex flex-col gap-8 px-6 py-8 lg:px-8">
        {/* Premium Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="h-1 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                Business Dashboard
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Business Performance Hub
            </h1>
            <p className="mt-2 text-base text-slate-600">
              Real-time insights into your business health and financial metrics
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm border border-slate-200">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>Live Data</span>
            </div>
            <Button
              size="sm"
              className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 hover:shadow-lg transition-all"
            >
              <DownloadCloud className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics Grid - Premium Cards */}
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            const tone =
              card.changeDirection === "down"
                ? "amber"
                : card.changeDirection === "steady"
                ? "slate"
                : "emerald";

            return (
              <div
                key={card.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-slate-300"
              >
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-50/30 opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50">
                    <Icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <Sparkline
                    data={card.sparkline}
                    tone={
                      tone === "amber"
                        ? "amber"
                        : tone === "slate"
                        ? "slate"
                        : "emerald"
                    }
                  />
                </div>
                <div className="relative z-10 mt-5 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {card.title}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-900">
                      {card.metric}
                    </span>
                    {card.suffix && (
                      <span className="text-sm font-medium text-slate-400">
                        {card.suffix}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-600">{card.subtext}</p>
                </div>
                <div className="relative z-10 mt-4 flex items-center gap-1.5 text-xs font-semibold">
                  {card.changeDirection === "down" && (
                    <>
                      <ArrowDownRight className="h-4 w-4 text-amber-600" />
                      <span className="text-amber-600">{card.change}</span>
                    </>
                  )}
                  {card.changeDirection === "up" && (
                    <>
                      <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                      <span className="text-emerald-600">{card.change}</span>
                    </>
                  )}
                  {card.changeDirection === "steady" && (
                    <>
                      <ArrowRight className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-500">{card.change}</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </section>

        {/* Trust Score & Insights Section */}
        <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          {/* Main Trust Score Card */}
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-slate-50 to-blue-50/30 px-7 py-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Business Health Score
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Your trust score improved{" "}
                    <span className="font-semibold text-emerald-600">
                      +4.3 points
                    </span>{" "}
                    this month
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${businessHealthStatus.bg} ${businessHealthStatus.tone}`}
                >
                  <CircleDot className="h-3 w-3" />
                  {businessHealthStatus.label}
                </span>
              </div>
            </div>

            <div className="px-7 py-8">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
                {/* Gauge */}
                <div className="flex justify-center lg:w-2/5">
                  <Gauge score={businessHealthScore} />
                </div>

                {/* Key Insights */}
                <div className="flex-1 space-y-5">
                  <div className="rounded-xl border border-emerald-100/60 bg-gradient-to-br from-emerald-50/80 to-emerald-50/40 p-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-600" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                          Performance Highlights
                        </p>
                        <ul className="mt-2 space-y-2 text-sm text-slate-700">
                          <li>• Inventory turnover improved to 36 days</li>
                          <li>• EBITDA margin trending at 12.4%</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-200/60 bg-gradient-to-br from-slate-50/80 to-slate-50/40 p-4">
                    <div className="flex items-start gap-2">
                      <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-slate-600" />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Action Items This Week
                        </p>
                        <ul className="mt-2 space-y-2 text-sm text-slate-700">
                          <li>• Confirm vendor rebates for raw materials</li>
                          <li>• Update investor profile with Sept data</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      asChild
                      size="sm"
                      className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 hover:shadow-lg transition-all"
                    >
                      <Link href="/advisor">Ask AI Advisor</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg text-sm border-slate-300"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Widgets */}
          <div className="flex flex-col gap-6">
            {/* AI Suggestions */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">
                    AI Suggestions
                  </h3>
                  <Link
                    href="/advisor"
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    View All →
                  </Link>
                </div>
              </div>
              <div className="space-y-2 p-4">
                {aiCoachPrompts.slice(0, 2).map((prompt) => (
                  <button
                    key={prompt.title}
                    className="group w-full rounded-xl border border-slate-200/60 bg-slate-50/50 p-3.5 text-left transition-all hover:border-emerald-200/80 hover:bg-emerald-50/40"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                          {prompt.tag}
                        </span>
                        <p className="mt-1.5 text-sm font-semibold text-slate-900">
                          {prompt.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                          {prompt.prompt}
                        </p>
                      </div>
                      <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-emerald-600" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Data Sync Status */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <h3 className="text-base font-bold text-slate-900">
                    Integrations
                  </h3>
                </div>
              </div>
              <div className="space-y-2 p-4">
                {[
                  {
                    name: "Tally Prime",
                    status: "Synced now",
                    state: "ready" as const,
                  },
                  {
                    name: "GST Portal",
                    status: "Pending",
                    state: "warning" as const,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg bg-slate-50/60 px-3.5 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {item.name}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {item.status}
                      </p>
                    </div>
                    <StatusPill state={item.state} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Performance Charts Section */}
        <section>
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">
              Financial Performance
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Monthly revenue, expenses, and profitability trends
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {performanceBlocks.map((block) => (
              <PerformanceCard key={block.title} block={block} />
            ))}
          </div>
        </section>

        {/* Receivables & Compliance Section */}
        <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Receivables Table */}
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-7 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Receivables Heatmap
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Clients requiring follow-up
                  </p>
                </div>
                <Link
                  href="/receivables"
                  className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  View All →
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-slate-100 bg-slate-50/50">
                  <tr className="text-xs font-bold uppercase text-slate-600">
                    <th className="px-6 py-4 text-left">Client</th>
                    <th className="px-6 py-4 text-left">Due Date</th>
                    <th className="px-6 py-4 text-left">Amount</th>
                    <th className="px-6 py-4 text-center">Risk</th>
                    <th className="px-6 py-4 text-right">Likelihood</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {receivables.map((invoice) => (
                    <tr
                      key={invoice.client}
                      className="transition-colors hover:bg-slate-50/40"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {invoice.client}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {invoice.aging} aging
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {invoice.due}
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {invoice.amount}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <RiskBadge level={invoice.risk} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2.5">
                          <div className="relative h-1.5 w-20 overflow-hidden rounded-full bg-slate-200">
                            <div
                              className={`h-full rounded-full ${
                                invoice.risk === "high"
                                  ? "bg-rose-500"
                                  : invoice.risk === "medium"
                                  ? "bg-amber-500"
                                  : "bg-emerald-500"
                              }`}
                              style={{ width: `${invoice.probability}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-slate-600 w-8">
                            {invoice.probability}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-slate-100 px-6 py-4">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
              >
                <Link href="/advisor">Automate Follow-ups →</Link>
              </Button>
            </div>
          </div>

          {/* Compliance & Investor Cards */}
          <div className="flex flex-col gap-6">
            {/* Compliance Card */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4">
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-slate-600" />
                  <h3 className="text-base font-bold text-slate-900">
                    Compliance
                  </h3>
                </div>
              </div>
              <div className="space-y-2 p-4">
                {upcomingCompliance.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-lg border border-slate-200/60 bg-slate-50/40 p-3.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {item.owner}
                        </p>
                      </div>
                      <ComplianceBadge status={item.status} />
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      Due {item.due}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Investor Connect Card */}
            <div className="overflow-hidden rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-500 via-emerald-500 to-teal-600 shadow-md">
              <div className="px-6 py-5 text-white">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-base font-bold">Investor Connect</h3>
                    <p className="mt-1 text-sm text-emerald-50">
                      Your score is investor-ready
                    </p>
                  </div>
                  <Users className="h-5 w-5 text-emerald-100 flex-shrink-0" />
                </div>
                <div className="space-y-2.5">
                  {investorSignals.map((signal) => (
                    <div
                      key={signal.fund}
                      className="rounded-lg bg-white/10 px-3.5 py-3 backdrop-blur-sm"
                    >
                      <p className="text-sm font-semibold">{signal.fund}</p>
                      <p className="mt-0.5 text-xs text-emerald-50">
                        {signal.focus}
                      </p>
                      <p className="mt-1 text-xs text-emerald-100/90">
                        {signal.interest}
                      </p>
                    </div>
                  ))}
                </div>
                <Button
                  asChild
                  size="sm"
                  className="mt-4 w-full rounded-lg bg-white/20 text-sm font-semibold text-white hover:bg-white/30 transition-colors"
                >
                  <Link href="/investor-connect">Share Profile →</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function linePath(
  data: number[],
  { width, height }: { width: number; height: number }
) {
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
  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedScore / 100) * circumference;

  const gaugeTone =
    clampedScore >= 80
      ? "stroke-emerald-500"
      : clampedScore >= 60
      ? "stroke-amber-500"
      : "stroke-rose-500";

  return (
    <div className="relative flex h-56 w-56 items-center justify-center">
      <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 160 160">
        <circle
          className="stroke-slate-200"
          strokeWidth={14}
          fill="transparent"
          r={radius}
          cx="80"
          cy="80"
        />
        <circle
          className={`${gaugeTone} transition-all duration-1000 ease-out`}
          strokeWidth={14}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="80"
          cy="80"
        />
      </svg>
      <div className="z-[1] flex flex-col items-center">
        <span className="text-5xl font-bold text-slate-900">
          {clampedScore}
        </span>
        <span className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-500">
          / 100
        </span>
      </div>
    </div>
  );
}

function Sparkline({
  data,
  tone = "emerald",
}: {
  data: number[];
  tone?: "emerald" | "amber" | "slate";
}) {
  const path = linePath(data, sparklineSize);
  if (!path) return null;

  const strokeClass =
    tone === "amber"
      ? "stroke-amber-500"
      : tone === "slate"
      ? "stroke-slate-400"
      : "stroke-emerald-500";

  return (
    <svg
      viewBox={`0 0 ${sparklineSize.width} ${sparklineSize.height}`}
      className="h-10 w-20"
    >
      <path
        d={path}
        fill="none"
        strokeWidth={2.5}
        className={strokeClass}
        strokeLinecap="round"
      />
    </svg>
  );
}

function PerformanceCard({ block }: { block: PerformanceBlock }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
          {block.subtitle}
        </p>
        <h3 className="mt-2 text-base font-bold text-slate-900">
          {block.title}
        </h3>
      </div>
      <div className="px-6 py-5">
        <svg
          viewBox={`0 0 ${performanceChartSize.width} ${performanceChartSize.height}`}
          className="h-32 w-full"
        >
          <rect
            x="0"
            y="0"
            width={performanceChartSize.width}
            height={performanceChartSize.height}
            rx="12"
            className="fill-slate-50/60"
          />
          <g className="stroke-slate-200/80">
            {[0, 1, 2, 3].map((grid) => (
              <line
                key={grid}
                x1="0"
                x2={performanceChartSize.width}
                y1={((performanceChartSize.height - 20) / 3) * grid + 10}
                y2={((performanceChartSize.height - 20) / 3) * grid + 10}
                strokeWidth={1}
              />
            ))}
          </g>
          {block.series.map((serie) => {
            const path = linePath(serie.data, performanceChartSize);
            if (!path) return null;
            return (
              <path
                key={serie.name}
                d={path}
                fill="none"
                strokeWidth={3}
                className={serie.className}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
        <div className="mt-4 flex items-center justify-between text-[10px] font-bold uppercase text-slate-600">
          {block.labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-4 text-xs font-semibold text-slate-600">
          {block.series.map((serie) => (
            <span key={serie.name} className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  serie.className === "stroke-amber-500"
                    ? "bg-amber-500"
                    : "bg-emerald-500"
                }`}
              />
              {serie.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function RiskBadge({ level }: { level: "high" | "medium" | "low" }) {
  const styles =
    level === "high"
      ? "bg-rose-50/80 text-rose-700 border-rose-200/60"
      : level === "medium"
      ? "bg-amber-50/80 text-amber-700 border-amber-200/60"
      : "bg-emerald-50/80 text-emerald-700 border-emerald-200/60";

  return (
    <span
      className={`inline-flex rounded-lg border px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${styles}`}
    >
      {level === "high" && "High"}
      {level === "medium" && "Medium"}
      {level === "low" && "Low"}
    </span>
  );
}

function ComplianceBadge({
  status,
}: {
  status: "urgent" | "due-soon" | "planned";
}) {
  const map = {
    urgent: {
      label: "Urgent",
      classes: "bg-rose-50/80 text-rose-700 border-rose-200/60",
    },
    "due-soon": {
      label: "Due Soon",
      classes: "bg-amber-50/80 text-amber-700 border-amber-200/60",
    },
    planned: {
      label: "Planned",
      classes: "bg-slate-100/80 text-slate-700 border-slate-200/60",
    },
  } as const;

  const pill = map[status];

  return (
    <span
      className={`inline-flex rounded-lg border px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${pill.classes}`}
    >
      {pill.label}
    </span>
  );
}

function StatusPill({ state }: { state: "ready" | "warning" | "info" }) {
  if (state === "warning") {
    return (
      <span className="inline-flex rounded-lg border border-amber-200/60 bg-amber-50/80 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-700">
        Action
      </span>
    );
  }
  if (state === "info") {
    return (
      <span className="inline-flex rounded-lg border border-slate-200/60 bg-slate-100/80 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-700">
        Pending
      </span>
    );
  }
  return (
    <span className="inline-flex rounded-lg border border-emerald-200/60 bg-emerald-50/80 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
      Synced
    </span>
  );
}
