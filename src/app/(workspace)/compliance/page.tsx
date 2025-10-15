"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Clock4,
  FileText,
  GaugeCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const ENTITY_TYPES = [
  "Proprietorship",
  "Partnership",
  "Private Limited Company",
  "Limited Liability Partnership",
  "Public Limited Company",
];

const TURNOVER_BRACKETS = [
  "< ₹40 Lakh",
  "₹40 Lakh - ₹1.5 Cr",
  "₹1.5 Cr - ₹5 Cr",
  "> ₹5 Cr",
];

const EMPLOYEE_BRACKETS = ["< 10", "10 - 19", "20+"];

type ComplianceStatus = "completed" | "upcoming" | "due-soon" | "overdue";

type TimelineTask = {
  id: string;
  name: string;
  dueDate: string;
  lastCompletedOn?: string;
  status: ComplianceStatus;
  category: string;
  checklist: string[];
};

type TimelineMonth = {
  month: string;
  tasks: TimelineTask[];
};

const TIMELINE: TimelineMonth[] = [
  {
    month: "October 2025",
    tasks: [
      {
        id: "gstr3b-oct",
        name: "GSTR-3B Filing (September 2025)",
        dueDate: "October 20, 2025",
        lastCompletedOn: "September 18, 2025",
        status: "due-soon",
        category: "GST",
        checklist: [
          "Total sales figures for September",
          "Purchase invoices for ITC claim",
          "Reverse charge transaction summary",
          "GST portal credentials",
        ],
      },
      {
        id: "tds-sept",
        name: "TDS Payment for September 2025",
        dueDate: "October 7, 2025",
        lastCompletedOn: "September 7, 2025",
        status: "completed",
        category: "Direct Tax",
        checklist: [
          "Challan 281 payment confirmation",
          "Salary & vendor deduction summary",
        ],
      },
    ],
  },
  {
    month: "November 2025",
    tasks: [
      {
        id: "pf-esi-nov",
        name: "Monthly PF & ESI Contribution",
        dueDate: "November 15, 2025",
        lastCompletedOn: "October 14, 2025",
        status: "upcoming",
        category: "Labour",
        checklist: [
          "Salary sheet for October",
          "UAN & ESIC data exports",
          "ECR text file",
        ],
      },
      {
        id: "gst-annual-return",
        name: "GST Annual Return Prep (FY 24-25)",
        dueDate: "November 30, 2025",
        lastCompletedOn: "-",
        status: "upcoming",
        category: "GST",
        checklist: [
          "GSTR-1 & 3B reconciliation",
          "2B vs purchase register review",
          "Auto-drafted annual data download",
        ],
      },
    ],
  },
  {
    month: "December 2025",
    tasks: [
      {
        id: "advance-tax",
        name: "Advance Tax - Installment 3",
        dueDate: "December 15, 2025",
        lastCompletedOn: "September 15, 2025",
        status: "upcoming",
        category: "Direct Tax",
        checklist: [
          "Updated P&L statement",
          "Projection for Q3 receipts",
          "Advance tax challan details",
        ],
      },
      {
        id: "shop-licence",
        name: "Shops & Establishments Renewal",
        dueDate: "December 31, 2025",
        lastCompletedOn: "December 30, 2024",
        status: "overdue",
        category: "Licences",
        checklist: [
          "Old licence copy",
          "Fee payment acknowledgement",
          "Renewal application form",
        ],
      },
    ],
  },
];

const COMPLIANCE_DOCUMENTS = [
  {
    name: "GST Certificate",
    uploadedOn: "May 12, 2023",
    expiresOn: "-",
  },
  {
    name: "Udyam Registration",
    uploadedOn: "February 01, 2024",
    expiresOn: "February 01, 2029",
  },
  {
    name: "Factory Licence",
    uploadedOn: "January 05, 2023",
    expiresOn: "January 05, 2026",
  },
];

const STATUS_STYLES: Record<
  ComplianceStatus,
  { label: string; className: string }
> = {
  completed: {
    label: "Completed",
    className: "bg-emerald-50 text-emerald-600 border border-emerald-200/70",
  },
  "due-soon": {
    label: "Due Soon",
    className: "bg-amber-50 text-amber-600 border border-amber-200/70",
  },
  upcoming: {
    label: "Upcoming",
    className: "bg-slate-100 text-slate-600 border border-slate-200/70",
  },
  overdue: {
    label: "Overdue",
    className: "bg-rose-50 text-rose-600 border border-rose-200/70",
  },
};

const TODAY = new Date("2025-10-16");
const NEXT_DEADLINE = TIMELINE[0].tasks[0];

const healthScore = 86;

export default function CompliancePage() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [gstRegistered, setGstRegistered] = useState(true);
  const [activeTask, setActiveTask] = useState<TimelineTask | null>(null);
  const [form, setForm] = useState({
    entityType: ENTITY_TYPES[0],
    turnover: TURNOVER_BRACKETS[1],
    employees: EMPLOYEE_BRACKETS[0],
  });

  const { countdownLabel, countdownTone } = useMemo(() => {
    const dueDate = new Date(NEXT_DEADLINE.dueDate);
    const millis = dueDate.getTime() - TODAY.getTime();
    const days = Math.ceil(millis / (1000 * 60 * 60 * 24));

    if (days > 0) {
      return {
        countdownLabel: `DUE IN ${days} DAY${days === 1 ? "" : "S"}`,
        countdownTone: days <= 5 ? "warning" : "default",
      } as const;
    }

    if (days === 0) {
      return {
        countdownLabel: "DUE TODAY",
        countdownTone: "critical",
      } as const;
    }

    return {
      countdownLabel: `OVERDUE BY ${Math.abs(days)} DAY${
        Math.abs(days) === 1 ? "" : "S"
      }`,
      countdownTone: "critical",
    } as const;
  }, []);

  const complianceMessage = useMemo(() => {
    if (healthScore >= 90) {
      return {
        tone: "positive",
        message: "You're on track. All filings are up to date.",
      } as const;
    }
    if (healthScore >= 70) {
      return {
        tone: "warning",
        message: "Action required. A deadline is approaching soon.",
      } as const;
    }
    return {
      tone: "critical",
      message: "Urgent. A deadline has been missed.",
    } as const;
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-2">
            <Badge className="rounded-full bg-slate-900 text-white">
              Compliance Command Center
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Stay ahead of every filing, automatically
            </h1>
            <p className="max-w-2xl text-sm text-slate-500">
              Track deadlines, prepare documents, and store your compliance
              records in one intelligent, proactive workspace.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-slate-200 px-5 font-semibold text-slate-600"
          >
            <Link href="/advisor?topic=compliance">
              <Sparkles className="mr-2 h-4 w-4" /> Ask SahayakAI for advice
            </Link>
          </Button>
        </div>
      </header>

      {/* Scorecard */}
      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Card
          className={cn(
            "border border-emerald-100/70 shadow-lg shadow-emerald-500/10",
            complianceMessage.tone === "warning" &&
              "border-amber-200/70 shadow-amber-500/10",
            complianceMessage.tone === "critical" &&
              "border-rose-200/70 shadow-rose-500/10"
          )}
        >
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Compliance Health Score</CardTitle>
              <CardDescription>
                Your compliance snapshot for this quarter
              </CardDescription>
            </div>
            <GaugeCircle className="h-8 w-8 text-emerald-400" />
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="relative flex items-center gap-6">
              <div
                className="relative flex h-36 w-36 items-center justify-center rounded-full"
                style={{
                  background: `conic-gradient(${
                    healthScore >= 90
                      ? "#10b981"
                      : healthScore >= 70
                      ? "#f59e0b"
                      : "#f97316"
                  } ${(healthScore / 100) * 360}deg, #e2e8f0 ${
                    (healthScore / 100) * 360
                  }deg)`,
                }}
              >
                <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white text-slate-900 shadow-inner">
                  <span className="text-3xl font-semibold">{healthScore}</span>
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    /100
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  Score computed from 12 statutory obligations this quarter
                </div>
                <p
                  className={cn(
                    "text-sm font-medium",
                    complianceMessage.tone === "positive" && "text-emerald-600",
                    complianceMessage.tone === "warning" && "text-amber-600",
                    complianceMessage.tone === "critical" && "text-rose-600"
                  )}
                >
                  {complianceMessage.message}
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 font-semibold uppercase tracking-[0.2em] text-emerald-600">
                    <CheckCircle2 className="h-3.5 w-3.5" /> 8 completed
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 font-semibold uppercase tracking-[0.2em] text-amber-600">
                    <Clock4 className="h-3.5 w-3.5" /> 3 due soon
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200/80 bg-gradient-to-br from-white via-white to-slate-50 shadow-lg">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle className="text-lg">
                Next Deadline Approaching
              </CardTitle>
              <CardDescription>
                Stay ahead of the most urgent task
              </CardDescription>
            </div>
            <CalendarDays className="h-8 w-8 text-slate-300" />
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em]",
                countdownTone === "warning" && "bg-amber-50 text-amber-600",
                countdownTone === "critical" && "bg-rose-50 text-rose-600",
                countdownTone === "default" && "bg-slate-100 text-slate-600"
              )}
            >
              <Clock4 className="h-4 w-4" />
              {countdownLabel}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-900">
                {NEXT_DEADLINE.name}
              </h3>
              <p className="text-sm text-slate-500">
                Due on {NEXT_DEADLINE.dueDate}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                className="rounded-full bg-emerald-500 px-5 font-semibold text-white shadow-md shadow-emerald-500/20"
                onClick={() => setActiveTask(NEXT_DEADLINE)}
              >
                Prepare for Filing
              </Button>
              <Button
                variant="outline"
                className="rounded-full border-slate-200 px-5 text-slate-600"
              >
                View Checklist
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Timeline */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Interactive Compliance Timeline
            </h2>
            <p className="text-sm text-slate-500">
              Review every statutory obligation with real-time status and
              instant preparation guidance.
            </p>
          </div>
          <Badge className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Quarter: Q3 FY 2025-26
          </Badge>
        </div>

        <div className="relative space-y-12 pl-12">
          <div className="absolute left-6 top-0 h-full w-px bg-slate-200" />
          {TIMELINE.map((section) => (
            <div key={section.month} className="relative pl-8">
              <div className="absolute left-6 top-2 flex -translate-x-1/2">
                <span className="h-3 w-3 rounded-full border-2 border-white bg-emerald-500 shadow" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
                  {section.month}
                </h3>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {section.tasks.map((task) => {
                  const status = STATUS_STYLES[task.status];
                  return (
                    <Card
                      key={task.id}
                      className="border border-slate-200/80 bg-white/95 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <CardHeader className="flex flex-row items-start justify-between gap-2">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge
                              className={cn(
                                "rounded-full px-3 py-1 text-[11px] font-semibold",
                                status.className
                              )}
                            >
                              {status.label}
                            </Badge>
                            <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                              {task.category}
                            </span>
                          </div>
                          <CardTitle className="text-base leading-tight text-slate-900">
                            {task.name}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 text-xs text-slate-500">
                            <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                            Due {task.dueDate}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="rounded-lg border border-slate-200/60 bg-slate-50/60 px-3 py-2 text-xs text-slate-500">
                          <span className="font-semibold text-slate-700">
                            Last completed on:
                          </span>{" "}
                          {task.lastCompletedOn ?? "-"}
                        </div>
                        <div className="space-y-2 text-sm text-slate-600">
                          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                            Preparation checklist
                          </p>
                          <ul className="space-y-1 text-xs">
                            {task.checklist.map((item) => (
                              <li key={item} className="flex items-start gap-2">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            className="rounded-full bg-emerald-500 px-4 text-xs font-semibold text-white shadow-sm shadow-emerald-500/20"
                            onClick={() => setActiveTask(task)}
                          >
                            Prepare
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-full border-slate-200 px-4 text-xs font-semibold text-slate-600"
                          >
                            Mark as Complete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance Vault */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Your Secure Document Vault
            </h2>
            <p className="text-sm text-slate-500">
              Store certificates, licences, and proof of compliance for instant
              access during audits.
            </p>
          </div>
          <Button className="rounded-full bg-slate-900 px-4 text-sm font-semibold text-white shadow-md shadow-slate-900/10">
            + Upload Document
          </Button>
        </div>
        <div className="overflow-hidden rounded-xl border border-slate-200/80 shadow-sm">
          <Table>
            <TableHeader className="bg-slate-50/80 text-xs uppercase tracking-[0.3em] text-slate-500">
              <TableRow>
                <TableHead className="px-6 py-3">Document Name</TableHead>
                <TableHead className="px-6 py-3">Upload Date</TableHead>
                <TableHead className="px-6 py-3">Expiry Date</TableHead>
                <TableHead className="px-6 py-3 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {COMPLIANCE_DOCUMENTS.map((doc) => (
                <TableRow key={doc.name} className="text-sm text-slate-700">
                  <TableCell className="px-6 py-4 font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-slate-400" />
                      {doc.name}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-slate-500">
                    {doc.uploadedOn}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-slate-500">
                    {doc.expiresOn}
                  </TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full border-slate-200 px-3 text-xs font-semibold text-slate-600"
                      >
                        Download
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full px-3 text-xs font-semibold text-rose-500 hover:bg-rose-50"
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Onboarding Modal */}
      <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
        <DialogContent className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl border-emerald-100 bg-white/95 p-0 shadow-2xl shadow-emerald-500/10">
          <div className="grid gap-0 overflow-hidden md:grid-cols-[1.1fr_1fr]">
            <div className="flex flex-col gap-6 p-8">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold text-slate-900">
                  Let’s create your personalized compliance calendar
                </DialogTitle>
                <DialogDescription className="text-sm text-slate-500">
                  Answer four quick questions so SahayakAI can tailor the
                  compliance workflow to your business type.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-5">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Business entity type
                  </Label>
                  <Select
                    value={form.entityType}
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, entityType: value }))
                    }
                  >
                    <SelectTrigger className="w-full rounded-xl border-slate-200/80 px-4 py-5 text-sm">
                      <SelectValue placeholder="Select your entity" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-200/80">
                      {ENTITY_TYPES.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Approximate annual turnover (FY 24-25)
                  </Label>
                  <Select
                    value={form.turnover}
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, turnover: value }))
                    }
                  >
                    <SelectTrigger className="w-full rounded-xl border-slate-200/80 px-4 py-5 text-sm">
                      <SelectValue placeholder="Select a bracket" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-200/80">
                      {TURNOVER_BRACKETS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                    Team size
                  </Label>
                  <Select
                    value={form.employees}
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, employees: value }))
                    }
                  >
                    <SelectTrigger className="w-full rounded-xl border-slate-200/80 px-4 py-5 text-sm">
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-200/80">
                      {EMPLOYEE_BRACKETS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50/60 px-4 py-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      Are you registered under GST?
                    </p>
                    <p className="text-xs text-slate-500">
                      This helps us prioritise returns like GSTR-1, 3B, and
                      annual recon.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "text-xs font-semibold uppercase tracking-[0.3em]",
                        gstRegistered ? "text-emerald-600" : "text-slate-400"
                      )}
                    >
                      {gstRegistered ? "Yes" : "No"}
                    </span>
                    <Switch
                      checked={gstRegistered}
                      onCheckedChange={setGstRegistered}
                    />
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  className="w-full rounded-full bg-slate-900 py-5 text-sm font-semibold text-white"
                  onClick={() => setShowOnboarding(false)}
                >
                  Build My Compliance Dashboard
                </Button>
              </DialogFooter>
            </div>

            <div className="relative hidden overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-500 to-slate-900 p-8 text-white md:flex md:flex-col">
              <div className="absolute inset-0 bg-[url('/window.svg')] bg-cover bg-center opacity-10" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="space-y-4">
                  <Badge className="rounded-full bg-white/20 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white">
                    Automated tracking
                  </Badge>
                  <h3 className="text-2xl font-semibold leading-snug">
                    SahayakAI keeps a live watch on every statutory obligation
                    your business has.
                  </h3>
                  <p className="text-sm text-emerald-100">
                    Tailored alerts, intelligent checklists, and document
                    vault—all synced to the regulations that apply to you.
                  </p>
                </div>
                <div className="space-y-3 rounded-3xl border border-white/20 bg-white/5 p-5 text-sm text-emerald-50">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="uppercase tracking-[0.3em] text-[11px]">
                      What you’ll get
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-200" />{" "}
                      Tailor-made compliance calendar
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-200" />{" "}
                      AI-powered filing preparation assistant
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle2 className="h-4 w-4 text-emerald-200" />{" "}
                      Smart vault with renewal reminders
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Prepare Modal */}
      <Dialog
        open={Boolean(activeTask)}
        onOpenChange={(open) => !open && setActiveTask(null)}
      >
        <DialogContent className="w-full max-w-xl rounded-3xl border border-emerald-100 bg-white/95 shadow-2xl shadow-emerald-500/10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-slate-900">
              Preparing for: {activeTask?.name}
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500">
              To ensure a smooth filing, gather the following information before
              you start.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
              <CalendarDays className="h-4 w-4" />
              Due on {activeTask?.dueDate}
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              {activeTask?.checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-4 text-sm text-slate-600">
              <strong className="flex items-center gap-2 text-slate-700">
                <AlertTriangle className="h-4 w-4 text-amber-500" /> SahayakAI
                Tip
              </strong>
              <p className="mt-2 text-sm text-slate-600">
                Remember to reconcile your purchase register with your GSTR-2B
                statement on the portal before finalising your ITC claim to
                avoid notices.
              </p>
            </div>
          </div>
          <DialogFooter className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <Button
              asChild
              variant="link"
              className="px-0 text-sm font-semibold text-emerald-600"
            >
              <Link href="/advisor?topic=gst-filing">
                Ask SahayakAI more questions about GST
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="rounded-full border-slate-200 px-4 text-sm font-semibold text-slate-600"
                onClick={() => setActiveTask(null)}
              >
                Close
              </Button>
              <Button className="rounded-full bg-emerald-500 px-5 text-sm font-semibold text-white">
                Mark as Prepared
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
