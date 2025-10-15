"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Eye,
  GaugeCircle,
  LineChart,
  Lock,
  PartyPopper,
  ShieldCheck,
  Target,
  TrendingUp,
  Unlock,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const FUND_USE_OPTIONS = [
  "Working Capital",
  "Machinery Purchase",
  "Market Expansion",
  "Hiring",
  "Technology Upgrade",
];

const TRUST_SCORE = 88;

const BENEFITS = [
  {
    icon: Target,
    title: "Access a Curated Network",
    description:
      "Connect with active investors who are already looking for MSMEs like yours.",
  },
  {
    icon: ShieldCheck,
    title: "Data-Driven Trust",
    description:
      "Let your verified Trust Score speak for your reliability—beyond pitch decks or collateral.",
  },
  {
    icon: Lock,
    title: "You Are in Control",
    description:
      "Stay anonymous until you approve an introduction. You decide when to reveal your details.",
  },
];

const SHARING_OPTIONS = [
  {
    id: "revenue-trend",
    label: "Share 12-Month Revenue Trend",
    defaultChecked: true,
  },
  {
    id: "profit-margin",
    label: "Share Profitability Margin Trend",
    defaultChecked: true,
  },
  {
    id: "customer-churn",
    label: "Share Customer Churn Rate",
    defaultChecked: false,
  },
];

const LIVE_METRICS = [
  {
    label: "Profile Views",
    value: "42",
    descriptor: "Last 30 days",
    icon: Eye,
    trend: "+18%",
  },
  {
    label: "Interest Requests",
    value: "3",
    descriptor: "New this week",
    icon: PartyPopper,
    trend: "+1",
  },
  {
    label: "Viewer Profile",
    value: "Angel Investor",
    descriptor: "Fintech • Mumbai-Based",
    icon: ArrowUpRight,
    trend: "AI recommendation",
  },
];

const PENDING_REQUESTS = [
  {
    id: "req-1",
    title: "Angel Investor from Mumbai",
    focus: "Focus on D2C & textile brands",
    note: "I'm impressed by your consistent profitability margin and Trust Score. Let's explore your expansion plan.",
  },
  {
    id: "req-2",
    title: "Family Office, Bengaluru",
    focus: "Prefers asset-light MSMEs with < 1.5 Cr ticket size",
    note: "We invest with a 3-5 year outlook. Curious about your working capital usage.",
  },
];

export default function InvestorConnectPage() {
  const [isDiscoverable, setIsDiscoverable] = useState(false);
  const [showcaseOpen, setShowcaseOpen] = useState(false);
  const [fundingAsk, setFundingAsk] = useState({ min: "15", max: "25" });
  const [useOfFunds, setUseOfFunds] = useState(FUND_USE_OPTIONS[0]);
  const [pitch, setPitch] = useState(
    "A profitable, 5-year-old textile business expanding capacity for export orders."
  );
  const [sharing, setSharing] = useState<Record<string, boolean>>(
    SHARING_OPTIONS.reduce((acc, item) => {
      acc[item.id] = item.defaultChecked;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const statusTone = useMemo(() => {
    if (TRUST_SCORE >= 90) return "positive" as const;
    if (TRUST_SCORE >= 75) return "warning" as const;
    return "critical" as const;
  }, []);

  const statusMessage = useMemo(() => {
    if (statusTone === "positive")
      return "Strong profile backed by healthy fundamentals.";
    if (statusTone === "warning")
      return "Good standing. Keep your filings current to improve further.";
    return "We’ve flagged improvement areas—resolve outstanding compliance to boost trust.";
  }, [statusTone]);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-2">
            <Badge className="rounded-full bg-slate-900 text-white">
              Investor Connect
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Showcase your business to the right investors
            </h1>
            <p className="max-w-2xl text-sm text-slate-500">
              Prepare your investor-ready profile, control what’s shared, and
              respond to interest with full transparency.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-slate-200 px-5 text-sm font-semibold text-slate-600"
          >
            <Link href="/advisor?topic=funding">
              <TrendingUp className="mr-2 h-4 w-4" /> Ask SahayakAI for funding
              advice
            </Link>
          </Button>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <Card
          className={cn(
            "border shadow-lg",
            isDiscoverable
              ? "border-emerald-200/70 shadow-emerald-500/20"
              : "border-slate-200/70 shadow-slate-200/40"
          )}
        >
          <CardHeader className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div
                className="relative flex h-28 w-28 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(${
                    TRUST_SCORE >= 85
                      ? "#10b981"
                      : TRUST_SCORE >= 70
                      ? "#f59e0b"
                      : "#f97316"
                  } ${(TRUST_SCORE / 100) * 360}deg, #e2e8f0 ${
                    (TRUST_SCORE / 100) * 360
                  }deg)`,
                }}
              >
                <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white shadow-inner">
                  <span className="text-3xl font-semibold text-slate-900">
                    {TRUST_SCORE}
                  </span>
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    /100
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <CardTitle className="text-xl font-semibold text-slate-900">
                  SahayakAI Trust Score
                </CardTitle>
                <CardDescription className="text-sm text-slate-500">
                  Updated 2 days ago • Derived from compliance, receivables
                  health, and runway signals
                </CardDescription>
                <p
                  className={cn(
                    "text-sm font-medium",
                    statusTone === "positive" && "text-emerald-600",
                    statusTone === "warning" && "text-amber-600",
                    statusTone === "critical" && "text-rose-600"
                  )}
                >
                  {statusMessage}
                </p>
              </div>
            </div>
            <div className="flex min-w-[220px] flex-col gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                {isDiscoverable ? (
                  <Unlock className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Lock className="h-4 w-4 text-slate-400" />
                )}
                {isDiscoverable ? "Profile is live" : "Profile is private"}
              </div>
              <p className="text-sm text-slate-600">
                {isDiscoverable
                  ? "Investors can now discover your anonymised profile in the funding marketplace."
                  : "Only you can view and edit this space until you decide to go live."}
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  className={cn(
                    "rounded-full px-5 text-sm font-semibold",
                    isDiscoverable
                      ? "bg-slate-900 text-white hover:bg-slate-800"
                      : "bg-emerald-500 text-white shadow-emerald-500/20"
                  )}
                  onClick={() => setIsDiscoverable((prev) => !prev)}
                >
                  {isDiscoverable
                    ? "Go Private"
                    : "Make My Profile Discoverable"}
                </Button>
                {isDiscoverable && (
                  <Button
                    variant="outline"
                    className="rounded-full border-slate-200 px-5 text-sm font-semibold text-slate-600"
                    onClick={() => setShowcaseOpen(true)}
                  >
                    Edit Showcase
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {!isDiscoverable ? (
          <Card className="border border-slate-200/80 bg-gradient-to-br from-white via-white to-slate-50">
            <CardHeader>
              <CardTitle className="text-lg">
                Turn your performance into your greatest asset
              </CardTitle>
              <CardDescription className="text-sm text-slate-500">
                Share a verified Trust Score—keep sensitive financials private
                until you authorise a connection.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 md:grid-cols-3">
                {BENEFITS.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="space-y-3 rounded-2xl border border-slate-200/70 bg-white/80 p-5 shadow-sm"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900/90 text-white">
                      <benefit.icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-900">
                        {benefit.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border border-emerald-200/70 shadow-emerald-500/10">
            <CardHeader>
              <CardTitle className="text-lg">Live Showcase Activity</CardTitle>
              <CardDescription className="text-sm text-slate-500">
                Monitor how investors are interacting with your profile right
                now.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {LIVE_METRICS.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-emerald-200/60 bg-white/90 p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-emerald-500">
                      {metric.label}
                      <metric.icon className="h-4 w-4" />
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-3xl font-semibold text-slate-900">
                        {metric.value}
                      </span>
                      <span className="text-xs font-semibold text-emerald-500">
                        {metric.trend}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      {metric.descriptor}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Investor Preview / Requests */}
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <Card className="border border-slate-200/80 shadow-sm">
          <CardHeader className="flex flex-col gap-2">
            <CardTitle className="text-lg">
              This is what investors will see
            </CardTitle>
            <CardDescription className="text-sm text-slate-500">
              A faithful preview of your anonymised MSME profile card on the
              investor portal.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    Anonymised identity
                  </p>
                  <h3 className="text-xl font-semibold text-slate-900">
                    Textile manufacturer from Jaipur
                  </h3>
                  <p className="text-sm text-slate-500">
                    A profitable, 5-year-old business with consistent
                    operational efficiency.
                  </p>
                </div>
                <div
                  className="relative flex h-20 w-20 items-center justify-center rounded-full"
                  style={{
                    background: `conic-gradient(#10b981 ${
                      (TRUST_SCORE / 100) * 360
                    }deg, #e2e8f0 ${(TRUST_SCORE / 100) * 360}deg)`,
                  }}
                >
                  <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full bg-white shadow-inner">
                    <span className="text-xl font-semibold text-slate-900">
                      {TRUST_SCORE}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
                      trust
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                    Funding ask
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    Seeking: ₹{fundingAsk.min}L - ₹{fundingAsk.max}L
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                    Use of funds
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    {useOfFunds}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200/70 bg-slate-50/60 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                    12-month revenue trend
                  </p>
                  <div className="mt-2 h-16 w-full rounded-lg bg-gradient-to-r from-emerald-200 via-emerald-400 to-emerald-600 opacity-80">
                    <div className="flex h-full items-end justify-between gap-1 px-2 pb-2">
                      {[40, 60, 55, 70, 68, 75, 80, 90, 110, 120, 140, 160].map(
                        (value, idx) => (
                          <span
                            key={idx}
                            className="w-1.5 rounded-full bg-white/80"
                            style={{
                              height: `${Math.min(value, 160) / 1.8}px`,
                            }}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Button
              className="rounded-full bg-slate-900 px-5 text-sm font-semibold text-white"
              onClick={() => setShowcaseOpen(true)}
            >
              Edit My Showcase Profile
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-slate-200/80 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">
                {isDiscoverable
                  ? "Pending introduction requests"
                  : "Get ready for investor interest"}
              </CardTitle>
              <CardDescription className="text-sm text-slate-500">
                {isDiscoverable
                  ? "Review and respond to investor introductions in one secure place."
                  : "Once you go live, investor requests will appear right here for you to approve."}
              </CardDescription>
            </div>
            <Badge
              className={cn(
                "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em]",
                isDiscoverable
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-slate-100 text-slate-500"
              )}
            >
              {isDiscoverable ? "Live" : "Private"}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {isDiscoverable ? (
              PENDING_REQUESTS.map((request) => (
                <div
                  key={request.id}
                  className="rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-900">
                        {request.title}
                      </p>
                      <p className="text-xs text-slate-500">{request.focus}</p>
                    </div>
                    <Badge className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-emerald-600">
                      New
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    “{request.note}”
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      className="rounded-full bg-emerald-500 px-4 text-xs font-semibold text-white"
                    >
                      ✓ Accept & Share Details
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full border-slate-200 px-4 text-xs font-semibold text-slate-600"
                    >
                      ✕ Decline
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-200/90 bg-slate-50/50 p-6 text-sm text-slate-500">
                <div className="flex items-center gap-3 text-slate-600">
                  <LineChart className="h-4 w-4" />
                  Go live to receive introduction requests from investors who
                  match your profile.
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  SahayakAI handles anonymised introductions so you can engage
                  only with vetted opportunities.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <Dialog open={showcaseOpen} onOpenChange={setShowcaseOpen}>
        <DialogContent className="w-full max-w-2xl rounded-3xl border border-slate-200/80 bg-white/95 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-slate-900">
              Craft your investor showcase
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500">
              Define the story investors will see when they discover your
              profile. All changes are local until you save.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Minimum funding ask (₹ Lakhs)
                </Label>
                <Input
                  value={fundingAsk.min}
                  onChange={(event) =>
                    setFundingAsk((prev) => ({
                      ...prev,
                      min: event.target.value,
                    }))
                  }
                  className="rounded-xl border-slate-200/80"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Maximum funding ask (₹ Lakhs)
                </Label>
                <Input
                  value={fundingAsk.max}
                  onChange={(event) =>
                    setFundingAsk((prev) => ({
                      ...prev,
                      max: event.target.value,
                    }))
                  }
                  className="rounded-xl border-slate-200/80"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Use of funds
              </Label>
              <Select value={useOfFunds} onValueChange={setUseOfFunds}>
                <SelectTrigger className="w-full rounded-xl border-slate-200/80 px-4 py-5 text-sm">
                  <SelectValue placeholder="Select use of funds" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200/80">
                  {FUND_USE_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Your 150-character pitch
              </Label>
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4">
                <textarea
                  value={pitch}
                  onChange={(event) =>
                    setPitch(event.target.value.slice(0, 150))
                  }
                  className="h-28 w-full resize-none rounded-xl border border-slate-200/70 bg-white/90 p-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
                <div className="mt-2 text-right text-xs text-slate-400">
                  {pitch.length}/150 characters
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Data sharing permissions
              </Label>
              <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4">
                <p className="text-xs text-slate-500">
                  Choose which signals investors can see before you accept an
                  introduction.
                </p>
                <div className="mt-3 space-y-3">
                  {SHARING_OPTIONS.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <Checkbox
                        checked={sharing[option.id]}
                        onCheckedChange={(checked) =>
                          setSharing((prev) => ({
                            ...prev,
                            [option.id]: Boolean(checked),
                          }))
                        }
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Button
              variant="ghost"
              className="rounded-full px-4 text-sm font-semibold text-slate-500"
              onClick={() => setShowcaseOpen(false)}
            >
              Cancel
            </Button>
            <Button className="rounded-full bg-emerald-500 px-6 text-sm font-semibold text-white">
              Save Showcase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
