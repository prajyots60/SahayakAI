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

const dataIntegrations = [
  {
    name: "Tally Prime",
    status: "Synced 2 hours ago",
    state: "ready" as const,
  },
  {
    name: "GST Portal",
    status: "Auth refresh due in 3 days",
    state: "warning" as const,
  },
  {
    name: "ICICI Bank Feeds",
    status: "Pending reconciliation",
    state: "info" as const,
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
  const quickLinks: DashboardNavSection["items"] = [];
  for (const section of dashboardNavSections) {
    quickLinks.push(...section.items);
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="space-y-6 rounded-3xl border border-emerald-100/70 bg-white/90 p-6 shadow-xl shadow-emerald-500/10 backdrop-blur">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-500">
              Today’s pulse
            </span>
            <div className="space-y-1">
              <h1 className="text-3xl font-semibold text-slate-900">
                Welcome back, Prajyot.
              </h1>
              <p className="max-w-xl text-sm text-slate-500">
                Your business copilot analysed fresh books, bank feeds, and GST
                signals overnight. Here’s what deserves your attention before
                lunch.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              className="rounded-xl border-emerald-200/70 bg-white px-5 py-5 text-sm font-semibold text-emerald-600 hover:bg-emerald-50"
            >
              <Clock className="mr-2 h-4 w-4 text-emerald-500" /> Updated 12
              mins ago
            </Button>
            <Button className="rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-5 py-5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-emerald-500/30">
              <DownloadCloud className="mr-2 h-4 w-4" /> Download summary
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 xl:hidden">
          {quickLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full border border-emerald-100 bg-emerald-50/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 shadow-sm"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
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
              className="relative overflow-hidden rounded-3xl border border-emerald-100/70 bg-white/90 p-6 shadow-lg shadow-emerald-500/10 backdrop-blur"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
                  <Icon className="h-5 w-5" />
                </span>
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
              <div className="mt-6 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400">
                  {card.title}
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-semibold text-slate-900">
                    {card.metric}
                  </span>
                  {card.suffix && (
                    <span className="text-sm font-medium text-slate-400">
                      {card.suffix}
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500">{card.subtext}</p>
                <div className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                  {card.changeDirection === "down" && (
                    <ArrowDownRight className="h-3.5 w-3.5" />
                  )}
                  {card.changeDirection === "up" && (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  )}
                  {card.changeDirection === "steady" && (
                    <ArrowRight className="h-3.5 w-3.5" />
                  )}
                  {card.change}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section id="trust-score" className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <div className="rounded-3xl border border-emerald-100/80 bg-white/95 p-8 shadow-xl shadow-emerald-500/10 backdrop-blur">
          <div className="flex flex-col gap-10 lg:flex-row">
            <div className="flex flex-1 flex-col items-center justify-center gap-6">
              <Gauge score={businessHealthScore} />
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${businessHealthStatus.bg} ${businessHealthStatus.tone}`}
              >
                <CircleDot className="h-3 w-3" /> Status:{" "}
                {businessHealthStatus.label}
              </span>
            </div>
            <div className="flex-1 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Your business health score climbed 4.3 points this month.
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Cash buffers, receivable discipline, and consistent GST
                  filings increased investor confidence. Keep the momentum with
                  these next best actions curated by SahayakAI.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-emerald-100/70 bg-emerald-50/40 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-500">
                    Leading signals
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-[2px] h-4 w-4 text-emerald-500" />
                      Inventory turnover improved to 36 days (target 38).
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-[2px] h-4 w-4 text-emerald-500" />
                      EBITDA margin trending at 12.4% with stable commodity
                      prices.
                    </li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-emerald-100/70 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-500">
                    Focus this week
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <Factory className="mt-[2px] h-4 w-4 text-emerald-500" />
                      Confirm vendor rebates for Diwali raw material orders.
                    </li>
                    <li className="flex items-start gap-2">
                      <Sparkles className="mt-[2px] h-4 w-4 text-emerald-500" />
                      Update investor-ready trust profile with September
                      performance.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-5 py-5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-emerald-500/30"
                >
                  <Link href="/advisor">Ask advisor for next steps</Link>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl border border-emerald-100 bg-white px-5 py-5 text-sm font-semibold text-emerald-600 hover:bg-emerald-50"
                >
                  View scoring model
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-emerald-100/70 bg-white/95 p-6 shadow-lg shadow-emerald-500/10 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-500">
                  AI coach nudges
                </p>
                <h3 className="text-lg font-semibold text-slate-900">
                  Personalised next best actions
                </h3>
              </div>
              <Link
                href="/advisor"
                className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600"
              >
                Open workspace
              </Link>
            </div>
            <div className="mt-5 space-y-3">
              {aiCoachPrompts.map((prompt) => (
                <div
                  key={prompt.title}
                  className="group rounded-2xl border border-emerald-100/60 bg-emerald-50/30 p-4 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/60"
                >
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400">
                    <span>{prompt.tag}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-emerald-400 transition group-hover:translate-x-1" />
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    {prompt.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{prompt.prompt}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-100/70 bg-white/95 p-6 shadow-lg shadow-emerald-500/10 backdrop-blur">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-emerald-500">
              <Clock className="h-4 w-4" /> Data sync status
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Keep integrations healthy so your projections never miss a beat.
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              {dataIntegrations.map((integration) => (
                <li
                  key={integration.name}
                  className="flex items-start justify-between rounded-2xl border border-emerald-100/60 bg-emerald-50/40 px-4 py-3"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {integration.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {integration.status}
                    </p>
                  </div>
                  <StatusPill state={integration.state} />
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                className="rounded-xl border border-emerald-100 bg-white px-4 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600 hover:bg-emerald-50"
              >
                Manage connectors
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        {performanceBlocks.map((block) => (
          <PerformanceCard key={block.title} block={block} />
        ))}
      </section>

      <section
        id="receivables"
        className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <div className="rounded-3xl border border-emerald-100/80 bg-white/95 p-6 shadow-xl shadow-emerald-500/10 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-500">
                Receivables heatmap
              </p>
              <h3 className="text-lg font-semibold text-slate-900">
                Clients needing follow-up this week
              </h3>
            </div>
            <Link
              href="/dashboard#trust-score"
              className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600"
            >
              View playbook
            </Link>
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl border border-emerald-100/60">
            <table className="w-full table-auto text-left text-sm">
              <thead className="bg-emerald-50/70 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-500">
                <tr>
                  <th className="px-5 py-3">Client</th>
                  <th className="px-5 py-3">Due date</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Delay risk</th>
                  <th className="px-5 py-3">Likelihood</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100/60 bg-white/90">
                {receivables.map((invoice) => (
                  <tr key={invoice.client} className="text-sm text-slate-600">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">
                        {invoice.client}
                      </p>
                      <p className="text-xs text-slate-400">
                        Aging {invoice.aging}
                      </p>
                    </td>
                    <td className="px-5 py-4">{invoice.due}</td>
                    <td className="px-5 py-4 font-semibold text-slate-900">
                      {invoice.amount}
                    </td>
                    <td className="px-5 py-4">
                      <RiskBadge level={invoice.risk} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-2 w-24 overflow-hidden rounded-full bg-emerald-100">
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
                        <span className="text-xs font-semibold text-slate-500">
                          {invoice.probability}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              asChild
              variant="ghost"
              className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600"
            >
              <Link href="/advisor">Automate follow-ups</Link>
            </Button>
          </div>
        </div>

        <div id="compliance" className="space-y-6">
          <div className="rounded-3xl border border-emerald-100/80 bg-white/95 p-6 shadow-xl shadow-emerald-500/10 backdrop-blur">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-500">
                  Compliance cockpit
                </p>
                <h3 className="text-lg font-semibold text-slate-900">
                  Statutory deadlines & owners
                </h3>
              </div>
              <CalendarClock className="h-5 w-5 text-emerald-500" />
            </div>
            <ul className="mt-5 space-y-4 text-sm">
              {upcomingCompliance.map((item) => (
                <li
                  key={item.title}
                  className="flex items-start justify-between rounded-2xl border border-emerald-100/60 bg-emerald-50/40 px-4 py-4"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500">
                      Owner: {item.owner}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Due {item.due}</p>
                    <ComplianceBadge status={item.status} />
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                className="rounded-xl border border-emerald-100 bg-white px-4 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600 hover:bg-emerald-50"
              >
                Export calendar
              </Button>
            </div>
          </div>

          <div
            id="investor-connect"
            className="rounded-3xl border border-emerald-100/80 bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 p-6 text-white shadow-xl shadow-emerald-600/30"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-100">
                  Investor connect
                </p>
                <h3 className="mt-2 text-lg font-semibold">
                  Your trust score is investor ready
                </h3>
                <p className="mt-2 text-sm text-emerald-50/90">
                  Showcase verified cash flow stability and compliance
                  discipline to unlock faster credit decisions.
                </p>
              </div>
              <Users className="h-8 w-8 text-emerald-100" />
            </div>
            <ul className="mt-5 space-y-3 text-sm text-emerald-50/90">
              {investorSignals.map((signal) => (
                <li
                  key={signal.fund}
                  className="rounded-2xl bg-white/10 px-4 py-3"
                >
                  <p className="font-semibold text-white">{signal.fund}</p>
                  <p>{signal.focus}</p>
                  <p className="text-xs text-emerald-100/90">
                    {signal.interest}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex justify-end">
              <Button
                asChild
                size="sm"
                className="rounded-xl bg-white/15 text-[11px] font-semibold uppercase tracking-[0.24em] text-white hover:bg-white/25"
              >
                <Link href="/dashboard#trust-score">Share trust profile</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
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
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedScore / 100) * circumference;

  const gaugeTone =
    clampedScore >= 80
      ? "stroke-emerald-500"
      : clampedScore >= 60
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
      className="h-12 w-24"
    >
      <path
        d={path}
        fill="none"
        strokeWidth={3}
        className={`${strokeClass} drop-shadow-[0_2px_6px_rgba(16,185,129,0.3)]`}
        strokeLinecap="round"
      />
    </svg>
  );
}

function PerformanceCard({ block }: { block: PerformanceBlock }) {
  return (
    <div className="rounded-3xl border border-emerald-100/80 bg-white/95 p-6 shadow-xl shadow-emerald-500/10 backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-500">
            {block.subtitle}
          </p>
          <h3 className="text-lg font-semibold text-slate-900">
            {block.title}
          </h3>
        </div>
      </div>
      <div className="mt-5">
        <svg
          viewBox={`0 0 ${performanceChartSize.width} ${performanceChartSize.height}`}
          className="h-36 w-full"
        >
          <rect
            x="0"
            y="0"
            width={performanceChartSize.width}
            height={performanceChartSize.height}
            rx="16"
            className="fill-emerald-50/40"
          />
          <g className="stroke-emerald-100">
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
                strokeWidth={3.5}
                className={`${serie.className} drop-shadow-[0_4px_12px_rgba(16,185,129,0.25)]`}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
        <div className="mt-3 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
          {block.labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
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
      ? "bg-rose-100 text-rose-600"
      : level === "medium"
      ? "bg-amber-100 text-amber-600"
      : "bg-emerald-100 text-emerald-600";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>
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
    urgent: { label: "Due today", classes: "bg-rose-100 text-rose-600" },
    "due-soon": { label: "Due soon", classes: "bg-amber-100 text-amber-600" },
    planned: { label: "Planned", classes: "bg-emerald-100 text-emerald-600" },
  } as const;

  const pill = map[status];

  return (
    <span
      className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${pill.classes}`}
    >
      {pill.label}
    </span>
  );
}

function StatusPill({ state }: { state: "ready" | "warning" | "info" }) {
  if (state === "warning") {
    return (
      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-600">
        Action needed
      </span>
    );
  }
  if (state === "info") {
    return (
      <span className="rounded-full bg-emerald-100/70 px-3 py-1 text-xs font-semibold text-emerald-600">
        Pending
      </span>
    );
  }
  return (
    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
      Synced
    </span>
  );
}
