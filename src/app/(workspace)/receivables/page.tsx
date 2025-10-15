"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CalendarClock,
  CircleDot,
  DownloadCloud,
  FileSpreadsheet,
  Mail,
  MessageCircle,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type InvoiceStatusKey = "on-track" | "due-soon" | "at-risk" | "overdue";
type Channel = "email" | "whatsapp";
type MessageTone = "polite" | "friendly" | "firm";

type Invoice = {
  id: string;
  customer: string;
  invoiceNumber: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  industry: string;
  averageDelay: number;
  predictedDelayProbability: number;
};

type StatusMeta = {
  label: string;
  description: string;
  badgeClass: string;
  dotClass: string;
};

const STATUS_META: Record<InvoiceStatusKey, StatusMeta> = {
  "on-track": {
    label: "On Track",
    description: "Likely to clear before due date",
    badgeClass: "bg-emerald-100 text-emerald-600",
    dotClass: "bg-emerald-500",
  },
  "due-soon": {
    label: "Due Soon",
    description: "Due within the next 7 days",
    badgeClass: "bg-amber-100 text-amber-600",
    dotClass: "bg-amber-500",
  },
  "at-risk": {
    label: "At Risk",
    description: "AI predicts a payment delay",
    badgeClass: "bg-rose-100 text-rose-600",
    dotClass: "bg-rose-500",
  },
  overdue: {
    label: "Overdue",
    description: "Due date has already passed",
    badgeClass: "bg-rose-200 text-rose-700",
    dotClass: "bg-rose-600",
  },
};

const STATUS_FILTERS: { key: InvoiceStatusKey | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "at-risk", label: "At Risk" },
  { key: "due-soon", label: "Due Soon" },
  { key: "overdue", label: "Overdue" },
  { key: "on-track", label: "On Track" },
];

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const longDate = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const initialInvoices: Invoice[] = [
  {
    id: "INV-1042",
    customer: "Aarav Retail LLP",
    invoiceNumber: "INV-1042",
    amount: 480000,
    issueDate: "2025-08-28",
    dueDate: "2025-09-30",
    industry: "Retail",
    averageDelay: 12,
    predictedDelayProbability: 0.82,
  },
  {
    id: "INV-1036",
    customer: "Namma Grocers",
    invoiceNumber: "INV-1036",
    amount: 310000,
    issueDate: "2025-09-15",
    dueDate: "2025-10-24",
    industry: "Wholesale",
    averageDelay: 7,
    predictedDelayProbability: 0.58,
  },
  {
    id: "INV-1031",
    customer: "Orbit Engineers",
    invoiceNumber: "INV-1031",
    amount: 260000,
    issueDate: "2025-09-25",
    dueDate: "2025-11-04",
    industry: "Manufacturing",
    averageDelay: 4,
    predictedDelayProbability: 0.32,
  },
  {
    id: "INV-1028",
    customer: "Sagar Hospitality",
    invoiceNumber: "INV-1028",
    amount: 175000,
    issueDate: "2025-09-10",
    dueDate: "2025-09-25",
    industry: "Hospitality",
    averageDelay: 15,
    predictedDelayProbability: 0.74,
  },
  {
    id: "INV-1021",
    customer: "BrightSpark Media",
    invoiceNumber: "INV-1021",
    amount: 98000,
    issueDate: "2025-09-18",
    dueDate: "2025-10-12",
    industry: "Services",
    averageDelay: 9,
    predictedDelayProbability: 0.67,
  },
];

function daysUntil(dateString: string, reference = new Date()): number {
  const due = new Date(dateString + "T00:00:00");
  const diff = due.getTime() - reference.getTime();
  return Math.floor(diff / MS_PER_DAY);
}

function formatDate(dateString: string): string {
  return longDate.format(new Date(dateString + "T00:00:00"));
}

function estimateProbability(
  averageDelay: number,
  amount: number,
  daysToDue: number
) {
  const delayFactor = Math.min(averageDelay / 30, 1);
  const amountFactor = Math.min(amount / 500000, 1);
  const urgencyFactor =
    daysToDue < 0
      ? 1
      : daysToDue <= 3
      ? 0.7
      : daysToDue <= 7
      ? 0.45
      : daysToDue <= 14
      ? 0.28
      : 0.12;
  const base =
    0.2 + delayFactor * 0.45 + amountFactor * 0.25 + urgencyFactor * 0.25;
  return Math.min(0.97, Math.max(0.05, base));
}

function resolveInvoiceStatus(
  invoice: Invoice,
  today = new Date()
): InvoiceStatusKey {
  const diff = daysUntil(invoice.dueDate, today);
  if (diff < 0) {
    return "overdue";
  }
  if (invoice.predictedDelayProbability >= 0.65) {
    return "at-risk";
  }
  if (diff <= 7) {
    return "due-soon";
  }
  return "on-track";
}

function buildFollowUpMessage(
  invoice: Invoice,
  channel: Channel,
  tone: MessageTone
) {
  const amount = currency.format(invoice.amount);
  const due = formatDate(invoice.dueDate);
  const greeting =
    tone === "firm" ? "Hello" : tone === "friendly" ? "Hi" : "Dear";
  const toneLine =
    tone === "firm"
      ? "This is a gentle reminder that the invoice has crossed the agreed timeline."
      : tone === "friendly"
      ? "Trust you're doing well."
      : "We hope you're doing well.";
  const askLine =
    tone === "firm"
      ? "Kindly prioritise this payment and let us know the exact transfer date so we can keep operations on track."
      : tone === "friendly"
      ? "Could you please let us know when we can expect the payment to hit our accounts?"
      : "We wanted to check if there is anything you need from our side to help process this payment smoothly.";
  const closing =
    tone === "firm"
      ? "Regards"
      : tone === "friendly"
      ? "Warm regards"
      : "Sincerely";
  const channelHint = channel === "whatsapp" ? "(sent via WhatsApp)" : "";

  return `${greeting} ${
    invoice.customer.split(" ")[0]
  },\n\n${toneLine}\nInvoice ${
    invoice.invoiceNumber
  } for ${amount} was due on ${due}. ${askLine}\n\nIn case the payment is already initiated, please ignore this note and share the UTR for our records.\n\n${closing},\nSahayakAI Receivables Desk ${channelHint}`;
}

export default function ReceivablesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<InvoiceStatusKey | "all">(
    "all"
  );
  const [followUpInvoice, setFollowUpInvoice] = useState<Invoice | null>(null);
  const [channel, setChannel] = useState<Channel>("email");
  const [tone, setTone] = useState<MessageTone>("polite");
  const [uploadFeedback, setUploadFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [formFeedback, setFormFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [formState, setFormState] = useState({
    customer: "",
    invoiceNumber: "",
    amount: "",
    issueDate: "",
    dueDate: "",
    industry: "",
    averageDelay: "",
  });

  const today = useMemo(() => new Date(), []);

  const metrics = useMemo(() => {
    return invoices.reduce(
      (acc, invoice) => {
        const status = resolveInvoiceStatus(invoice, today);
        acc.total += invoice.amount;
        if (status === "overdue") {
          acc.overdue += invoice.amount;
          acc.overdueCount += 1;
        }
        if (status === "at-risk") {
          acc.predictedDelay += invoice.amount;
          acc.atRiskCount += 1;
        }
        if (status === "due-soon") {
          acc.dueSoonCount += 1;
        }
        return acc;
      },
      {
        total: 0,
        overdue: 0,
        predictedDelay: 0,
        overdueCount: 0,
        atRiskCount: 0,
        dueSoonCount: 0,
      }
    );
  }, [invoices, today]);

  const filteredInvoices = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return invoices.filter((invoice) => {
      const status = resolveInvoiceStatus(invoice, today);
      if (statusFilter !== "all" && status !== statusFilter) {
        return false;
      }
      if (!query) {
        return true;
      }
      const haystack =
        `${invoice.customer} ${invoice.invoiceNumber} ${invoice.industry}`.toLowerCase();
      return haystack.includes(query);
    });
  }, [invoices, searchTerm, statusFilter, today]);

  const sortedInvoices = useMemo(() => {
    return [...filteredInvoices].sort((a, b) => {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }, [filteredInvoices]);

  const followUpMessage = followUpInvoice
    ? buildFollowUpMessage(followUpInvoice, channel, tone)
    : "";

  const handleManualEntry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormFeedback(null);

    const parsedAmount = Number(formState.amount.replace(/,/g, ""));
    const parsedDelay = Number(formState.averageDelay);

    if (
      !formState.customer ||
      !formState.invoiceNumber ||
      !formState.amount ||
      !formState.issueDate ||
      !formState.dueDate
    ) {
      setFormFeedback({
        type: "error",
        message: "Please complete all required fields.",
      });
      return;
    }

    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setFormFeedback({
        type: "error",
        message: "Enter a valid invoice amount.",
      });
      return;
    }

    if (new Date(formState.dueDate) < new Date(formState.issueDate)) {
      setFormFeedback({
        type: "error",
        message: "Due date cannot be before the issue date.",
      });
      return;
    }

    const daysToDue = daysUntil(formState.dueDate, today);
    const probability = estimateProbability(
      parsedDelay || 0,
      parsedAmount,
      daysToDue
    );

    const newInvoice: Invoice = {
      id: crypto.randomUUID?.() ?? `INV-${Date.now()}`,
      customer: formState.customer.trim(),
      invoiceNumber: formState.invoiceNumber.trim(),
      amount: parsedAmount,
      issueDate: formState.issueDate,
      dueDate: formState.dueDate,
      industry: formState.industry.trim() || "General",
      averageDelay: Number.isNaN(parsedDelay) ? 0 : parsedDelay,
      predictedDelayProbability: probability,
    };

    setInvoices((prev) => [newInvoice, ...prev]);
    setFormFeedback({
      type: "success",
      message: `${newInvoice.invoiceNumber} added with a ${Math.round(
        probability * 100
      )}% delay probability.`,
    });
    setFormState({
      customer: "",
      invoiceNumber: "",
      amount: "",
      issueDate: "",
      dueDate: "",
      industry: "",
      averageDelay: "",
    });
  };

  const handleCsvUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadFeedback(null);

    try {
      const text = await file.text();
      const [headerLine, ...rows] = text.trim().split(/\r?\n/);
      if (!headerLine || rows.length === 0) {
        throw new Error("No data found in the CSV file.");
      }

      const parsed: Invoice[] = rows
        .map((row) => row.split(","))
        .filter((cols) => cols.length >= 7)
        .map((cols) => {
          const [
            customer,
            invoiceNumber,
            amountRaw,
            issueDate,
            dueDate,
            industry,
            avgDelayRaw,
          ] = cols;
          const amount = Number(amountRaw.replace(/[^0-9.]/g, ""));
          const avgDelay = Number(avgDelayRaw);
          const estimate = estimateProbability(
            avgDelay || 0,
            amount || 0,
            daysUntil(dueDate, today)
          );
          return {
            id:
              crypto.randomUUID?.() ??
              `${invoiceNumber}-${Math.random().toString(16).slice(2)}`,
            customer: customer.trim(),
            invoiceNumber: invoiceNumber.trim(),
            amount,
            issueDate: issueDate.trim(),
            dueDate: dueDate.trim(),
            industry: industry?.trim() || "General",
            averageDelay: Number.isNaN(avgDelay) ? 0 : avgDelay,
            predictedDelayProbability: estimate,
          } satisfies Invoice;
        });

      setInvoices((prev) => [...parsed, ...prev]);
      setUploadFeedback({
        type: "success",
        message: `${parsed.length} invoices queued with AI predictions applied.`,
      });
      event.target.value = "";
    } catch (error) {
      setUploadFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to process the CSV file.",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8 overflow-x-hidden">
        <header className="space-y-6 rounded-3xl border border-emerald-100/70 bg-white/95 p-6 shadow-xl shadow-emerald-500/10 backdrop-blur">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">
                Smart Receivables
              </Badge>
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-slate-900">
                  Receivables cockpit for calm cashflows
                </h1>
                <p className="max-w-2xl text-sm text-slate-500">
                  Prioritise who to call, get AI-crafted nudges, and keep
                  investor confidence high without the midnight anxiety of
                  delayed payments.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                variant="outline"
                className="rounded-xl border-emerald-200 bg-white px-4 py-5 text-sm font-semibold text-emerald-600 hover:bg-emerald-50"
              >
                <Link href="/advisor">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Ask AI coach for a collection plan
                </Link>
              </Button>
              <Button className="rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-4 py-5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-emerald-500/30">
                <DownloadCloud className="mr-2 h-4 w-4" />
                Download daily summary
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl bg-emerald-50/50 p-4 text-sm text-emerald-900 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <CircleDot className="h-4 w-4 text-emerald-500" />
              <span>
                You have {metrics.atRiskCount} invoices flagged as{" "}
                <span className="font-semibold">"At Risk"</span> and{" "}
                {metrics.overdueCount} already overdue. Let’s resolve them
                before this week closes.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="rounded-full border border-emerald-200 bg-white px-4 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600"
                onClick={() => {
                  const critical = invoices.find(
                    (invoice) =>
                      resolveInvoiceStatus(invoice, today) === "at-risk"
                  );
                  if (critical) {
                    setFollowUpInvoice(critical);
                    setChannel("email");
                    setTone("polite");
                  }
                }}
              >
                Draft follow-up now
              </Button>
            </div>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <SummaryCard
            title="Total receivables"
            subtitle="Across open invoices"
            icon={TrendingUp}
            iconClass="text-emerald-500"
            amount={metrics.total}
            badgeLabel={
              metrics.overdueCount > 0
                ? `${metrics.overdueCount} clients pending`
                : "Healthy"
            }
          />
          <SummaryCard
            title="Overdue right now"
            subtitle="Needs immediate action"
            icon={AlertTriangle}
            iconClass="text-rose-500"
            amount={metrics.overdue}
            badgeLabel={metrics.overdue > 0 ? "Escalate today" : "All clear"}
            badgeTone={metrics.overdue > 0 ? "warning" : "positive"}
          />
          <SummaryCard
            title="Predicted delays"
            subtitle="AI flagged risk"
            icon={CalendarClock}
            iconClass="text-amber-500"
            amount={metrics.predictedDelay}
            badgeLabel={`${metrics.atRiskCount} invoices to pre-empt`}
            badgeTone="warning"
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <div className="rounded-3xl border border-emerald-100/80 bg-white/95 p-6 shadow-xl shadow-emerald-500/10 backdrop-blur">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-500">
                  Invoice queue
                </p>
                <h2 className="text-lg font-semibold text-slate-900">
                  Prioritised list of every rupee owed to you
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                <Input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search by customer, invoice or industry"
                  className="h-10 w-full rounded-full border-emerald-100 bg-white/80 px-5 text-sm text-slate-600 shadow-inner-sm focus:border-emerald-300 focus:ring-emerald-200 sm:w-64"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {STATUS_FILTERS.map((filter) => (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setStatusFilter(filter.key)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition",
                    statusFilter === filter.key
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                      : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-100/70">
              <div className="overflow-x-auto">
                <Table className="min-w-[860px] w-full">
                  <TableHeader className="bg-emerald-50/70 text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-500">
                    <TableRow>
                      <TableHead className="px-4 py-3">Status</TableHead>
                      <TableHead className="px-4 py-3">Client</TableHead>
                      <TableHead className="px-4 py-3">Invoice</TableHead>
                      <TableHead className="px-4 py-3">Amount</TableHead>
                      <TableHead className="px-4 py-3">Due date</TableHead>
                      <TableHead className="px-4 py-3">Days</TableHead>
                      <TableHead className="px-4 py-3 text-right">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedInvoices.map((invoice) => {
                      const statusKey = resolveInvoiceStatus(invoice, today);
                      const status = STATUS_META[statusKey];
                      const daysLeft = daysUntil(invoice.dueDate, today);
                      const probability = Math.round(
                        invoice.predictedDelayProbability * 100
                      );
                      const statusDescription =
                        statusKey === "overdue"
                          ? `${Math.abs(daysLeft)} days past due`
                          : statusKey === "due-soon"
                          ? `${daysLeft} days to go`
                          : `${probability}% risk`;

                      return (
                        <TableRow key={invoice.id} className="bg-white/60">
                          <TableCell className="px-4 py-4">
                            <div className="space-y-1">
                              <span
                                className={cn(
                                  "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
                                  status.badgeClass
                                )}
                              >
                                <span
                                  className={cn(
                                    "h-1.5 w-1.5 rounded-full",
                                    status.dotClass
                                  )}
                                />
                                {status.label}
                              </span>
                              <p className="text-[11px] text-slate-400">
                                {statusDescription}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-4">
                            <div className="space-y-1">
                              <p className="text-sm font-semibold text-slate-900">
                                {invoice.customer}
                              </p>
                              <p className="text-xs text-slate-500">
                                {invoice.industry} • Avg delay{" "}
                                {invoice.averageDelay}d
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="px-4 py-4 text-sm text-slate-600">
                            {invoice.invoiceNumber}
                          </TableCell>
                          <TableCell className="px-4 py-4 text-sm font-semibold text-slate-900">
                            {currency.format(invoice.amount)}
                          </TableCell>
                          <TableCell className="px-4 py-4 text-sm text-slate-600">
                            {formatDate(invoice.dueDate)}
                          </TableCell>
                          <TableCell className="px-4 py-4 text-sm text-slate-600">
                            {statusKey === "overdue"
                              ? `-${Math.abs(daysLeft)}`
                              : daysLeft}
                          </TableCell>
                          <TableCell className="px-4 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              {(statusKey === "at-risk" ||
                                statusKey === "overdue") && (
                                <Button
                                  size="sm"
                                  className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-600"
                                  onClick={() => {
                                    setFollowUpInvoice(invoice);
                                    setChannel("email");
                                    setTone("polite");
                                  }}
                                >
                                  Ask SahayakAI
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              {sortedInvoices.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center text-sm text-slate-500">
                  <Sparkles className="h-8 w-8 text-emerald-400" />
                  <p>No invoices match your current filters.</p>
                  <Button
                    variant="ghost"
                    className="rounded-full border border-emerald-100 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600"
                    onClick={() => {
                      setStatusFilter("all");
                      setSearchTerm("");
                    }}
                  >
                    Reset filters
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-emerald-100/70 bg-white/95 p-6 shadow-lg shadow-emerald-500/10 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-500">
                    Quick add invoice
                  </p>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Add a new receivable in two fields
                  </h3>
                </div>
                <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600">
                  Live ETA scoring
                </Badge>
              </div>

              <form className="mt-4 space-y-4" onSubmit={handleManualEntry}>
                <div className="grid gap-3">
                  <div className="grid gap-2">
                    <Label htmlFor="customer">Customer name *</Label>
                    <Input
                      id="customer"
                      placeholder="Acme Distributors Pvt. Ltd."
                      value={formState.customer}
                      onChange={(event) =>
                        setFormState((prev) => ({
                          ...prev,
                          customer: event.target.value,
                        }))
                      }
                      className="rounded-lg border-emerald-100 bg-white/80"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="invoice-number">Invoice number *</Label>
                    <Input
                      id="invoice-number"
                      placeholder="INV-2056"
                      value={formState.invoiceNumber}
                      onChange={(event) =>
                        setFormState((prev) => ({
                          ...prev,
                          invoiceNumber: event.target.value,
                        }))
                      }
                      className="rounded-lg border-emerald-100 bg-white/80"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="amount">Amount (₹) *</Label>
                    <Input
                      id="amount"
                      type="number"
                      min="0"
                      placeholder="250000"
                      value={formState.amount}
                      onChange={(event) =>
                        setFormState((prev) => ({
                          ...prev,
                          amount: event.target.value,
                        }))
                      }
                      className="rounded-lg border-emerald-100 bg-white/80"
                    />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="issue-date">Issue date *</Label>
                      <Input
                        id="issue-date"
                        type="date"
                        value={formState.issueDate}
                        onChange={(event) =>
                          setFormState((prev) => ({
                            ...prev,
                            issueDate: event.target.value,
                          }))
                        }
                        className="rounded-lg border-emerald-100 bg-white/80"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="due-date">Due date *</Label>
                      <Input
                        id="due-date"
                        type="date"
                        value={formState.dueDate}
                        onChange={(event) =>
                          setFormState((prev) => ({
                            ...prev,
                            dueDate: event.target.value,
                          }))
                        }
                        className="rounded-lg border-emerald-100 bg-white/80"
                      />
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="industry">Client industry</Label>
                      <Input
                        id="industry"
                        placeholder="Manufacturing"
                        value={formState.industry}
                        onChange={(event) =>
                          setFormState((prev) => ({
                            ...prev,
                            industry: event.target.value,
                          }))
                        }
                        className="rounded-lg border-emerald-100 bg-white/80"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="average-delay">
                        Average payment delay (days)
                      </Label>
                      <Input
                        id="average-delay"
                        type="number"
                        min="0"
                        placeholder="7"
                        value={formState.averageDelay}
                        onChange={(event) =>
                          setFormState((prev) => ({
                            ...prev,
                            averageDelay: event.target.value,
                          }))
                        }
                        className="rounded-lg border-emerald-100 bg-white/80"
                      />
                    </div>
                  </div>
                </div>

                {formFeedback && (
                  <div
                    className={cn(
                      "rounded-xl border px-4 py-3 text-sm",
                      formFeedback.type === "success"
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-rose-200 bg-rose-50 text-rose-600"
                    )}
                  >
                    {formFeedback.message}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 py-5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 hover:shadow-emerald-500/30"
                >
                  Create invoice & score risk
                </Button>
              </form>
            </div>

            <div className="rounded-3xl border border-emerald-100/70 bg-white/95 p-6 shadow-lg shadow-emerald-500/10 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-500">
                    Bulk upload
                  </p>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Import all invoices in one go
                  </h3>
                  <p className="text-xs text-slate-500">
                    Use our template, upload the CSV, and let SahayakAI grade
                    every receivable instantly.
                  </p>
                </div>
                <a
                  href="/templates/invoice-upload-template.csv"
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600 hover:bg-emerald-100"
                >
                  <FileSpreadsheet className="h-3.5 w-3.5" /> Template
                </a>
              </div>

              <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 p-5 text-center">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCsvUpload}
                  className="hidden"
                  id="invoice-upload"
                />
                <label
                  htmlFor="invoice-upload"
                  className="cursor-pointer text-sm font-semibold text-emerald-600"
                >
                  Drag & drop or click to upload CSV
                </label>
                <p className="text-xs text-slate-500">
                  We’ll score risk, mark statuses, and suggest follow-ups
                  automatically.
                </p>
              </div>

              {uploadFeedback && (
                <div
                  className={cn(
                    "mt-4 rounded-xl border px-4 py-3 text-sm",
                    uploadFeedback.type === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-rose-200 bg-rose-50 text-rose-600"
                  )}
                >
                  {uploadFeedback.message}
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-emerald-100/70 bg-white/95 p-6 shadow-lg shadow-emerald-500/10 backdrop-blur">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-1 h-5 w-5 text-emerald-500" />
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-500">
                    Predictive engine
                  </p>
                  <h3 className="text-lg font-semibold text-slate-900">
                    How we forecast delays
                  </h3>
                  <ul className="list-disc space-y-1 pl-4 text-xs text-slate-500">
                    <li>
                      Client history: average delay of each buyer carries the
                      highest weight.
                    </li>
                    <li>
                      Invoice context: ticket size vs usual spend highlights
                      stress points.
                    </li>
                    <li>
                      Runway to due date: shorter windows or overdue invoices
                      spike risk.
                    </li>
                    <li>
                      Sector intelligence: optional industry signals adapt to
                      MSME realities.
                    </li>
                  </ul>
                  <div className="rounded-2xl bg-emerald-50/60 p-4 text-xs text-emerald-900">
                    <p className="font-semibold">Transparency promise</p>
                    <p>
                      Every prediction is logged so you can explain decisions to
                      auditors, lenders, and your finance team without breaking
                      a sweat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Dialog
        open={Boolean(followUpInvoice)}
        onOpenChange={(open) => !open && setFollowUpInvoice(null)}
      >
        <DialogContent className="max-w-xl rounded-3xl border border-emerald-100 bg-white/95 shadow-2xl shadow-emerald-500/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-slate-900">
              AI-crafted reminder for {followUpInvoice?.customer}
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500">
              Choose the tone and channel. Copy the message and send via your
              preferred medium.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {followUpInvoice && (
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 text-sm text-slate-700">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600">
                    {followUpInvoice.invoiceNumber}
                  </Badge>
                  <span>
                    {currency.format(followUpInvoice.amount)} • Due{" "}
                    {formatDate(followUpInvoice.dueDate)} •{" "}
                    {Math.round(
                      followUpInvoice.predictedDelayProbability * 100
                    )}
                    % risk
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <ChannelPill
                label="Email"
                icon={Mail}
                active={channel === "email"}
                onClick={() => setChannel("email")}
              />
              <ChannelPill
                label="WhatsApp"
                icon={MessageCircle}
                active={channel === "whatsapp"}
                onClick={() => setChannel("whatsapp")}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <TonePill
                label="Polite"
                active={tone === "polite"}
                onClick={() => setTone("polite")}
              />
              <TonePill
                label="Friendly"
                active={tone === "friendly"}
                onClick={() => setTone("friendly")}
              />
              <TonePill
                label="Firm"
                active={tone === "firm"}
                onClick={() => setTone("firm")}
              />
            </div>

            <Textarea
              readOnly
              value={followUpMessage}
              className="min-h-[220px] rounded-2xl border-emerald-100 bg-white/80 text-sm text-slate-700"
            />
          </div>

          <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <CircleDot className="h-3.5 w-3.5 text-emerald-400" />
              AI suggestion • Edit freely before sending
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl border-emerald-200 px-4 text-sm font-semibold text-emerald-600 hover:bg-emerald-50"
                onClick={() => {
                  if (!followUpMessage) return;
                  navigator.clipboard.writeText(followUpMessage);
                }}
              >
                Copy message
              </Button>
              <Button
                type="button"
                className="rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-4 text-sm font-semibold text-white"
                onClick={() => setFollowUpInvoice(null)}
              >
                Mark as drafted
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

type SummaryCardProps = {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  iconClass?: string;
  amount: number;
  badgeLabel: string;
  badgeTone?: "warning" | "positive";
};

function SummaryCard({
  title,
  subtitle,
  icon: Icon,
  iconClass,
  amount,
  badgeLabel,
  badgeTone,
}: SummaryCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-emerald-100/80 bg-white/95 p-6 shadow-lg shadow-emerald-500/10 backdrop-blur">
      <div className="absolute -right-12 -top-10 h-32 w-32 rounded-full bg-emerald-100/40" />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-500">
            {title}
          </p>
          <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
        <span
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50",
            iconClass
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <div className="mt-6 text-3xl font-semibold text-slate-900">
        {currency.format(amount)}
      </div>
      <span
        className={cn(
          "mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]",
          badgeTone === "warning"
            ? "bg-amber-100 text-amber-600"
            : badgeTone === "positive"
            ? "bg-emerald-100 text-emerald-600"
            : "bg-emerald-50 text-emerald-600"
        )}
      >
        {badgeLabel}
      </span>
    </div>
  );
}

type ChannelPillProps = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  onClick: () => void;
};

function ChannelPill({ label, icon: Icon, active, onClick }: ChannelPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
        active
          ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
          : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

type TonePillProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function TonePill({ label, active, onClick }: TonePillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-2 text-sm font-semibold",
        active
          ? "bg-slate-900 text-white shadow-md shadow-slate-800/30"
          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
      )}
    >
      {label}
    </button>
  );
}
