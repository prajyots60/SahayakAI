"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CloudUpload, Factory, FileDown, Lightbulb } from "lucide-react";

const industries = [
  "Manufacturing",
  "Retail & Ecommerce",
  "Services",
  "Hospitality",
  "Agriculture",
  "Other",
];

export default function DataInputPage() {
  const [industry, setIndustry] = useState<string>("Manufacturing");

  const showManufacturingFields = useMemo(
    () => industry === "Manufacturing",
    [industry]
  );

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-3 sm:px-0">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100/70 bg-emerald-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
          Data intake
        </div>
        <h1 className="text-3xl font-semibold text-slate-900">
          Add Business Data for October 2025
        </h1>
        <p className="max-w-2xl text-sm text-slate-500">
          Keep your forecasts accurate by sharing the latest numbers. Grouped
          inputs help you move quickly, while CSV upload is available if you
          prefer a spreadsheet workflow.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6 rounded-3xl border border-emerald-100 bg-white/95 p-8 shadow-xl shadow-emerald-500/10">
          <div className="grid gap-5">
            <div className="grid gap-2">
              <label
                htmlFor="industry"
                className="text-sm font-semibold uppercase tracking-[0.26em] text-emerald-500"
              >
                Industry
              </label>
              <select
                id="industry"
                className="w-full rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={industry}
                onChange={(event) => setIndustry(event.target.value)}
              >
                {industries.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <fieldset className="grid gap-4 rounded-2xl border border-emerald-100 bg-white/90 p-6">
              <legend className="px-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-500">
                Financials
              </legend>
              <div className="grid gap-4 md:grid-cols-2">
                <InputField
                  id="revenue"
                  label="Revenue (₹ lakh)"
                  placeholder="63"
                />
                <InputField
                  id="expenses"
                  label="Expenses (₹ lakh)"
                  placeholder="46"
                />
              </div>
            </fieldset>

            <fieldset className="grid gap-4 rounded-2xl border border-emerald-100 bg-white/90 p-6">
              <legend className="px-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-500">
                Operations
              </legend>
              <div className="grid gap-4 md:grid-cols-2">
                <InputField
                  id="invoices"
                  label="Invoices sent"
                  placeholder="120"
                />
                <InputField
                  id="payment-delay"
                  label="Average payment delay (days)"
                  placeholder="18"
                />
                <InputField
                  id="churn"
                  label="Customer churn rate (%)"
                  placeholder="4.2"
                />
              </div>
            </fieldset>

            {showManufacturingFields && (
              <fieldset className="grid gap-4 rounded-2xl border border-emerald-100 bg-white/90 p-6">
                <legend className="flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-500">
                  <Factory className="h-4 w-4" /> Manufacturing specifics
                </legend>
                <div className="grid gap-4 md:grid-cols-2">
                  <InputField
                    id="production-units"
                    label="Production units"
                    placeholder="2,400"
                  />
                  <InputField
                    id="waste"
                    label="Waste percentage (%)"
                    placeholder="1.6"
                  />
                </div>
              </fieldset>
            )}
          </div>

          <div className="flex flex-wrap gap-4">
            <Button className="rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-6 py-5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-emerald-500/30">
              Save snapshot
            </Button>
            <Button
              variant="outline"
              className="rounded-xl border border-emerald-100 bg-white px-6 py-5 text-sm font-semibold text-emerald-600 hover:bg-emerald-50"
            >
              Save & add another month
            </Button>
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 rounded-3xl border border-emerald-100 bg-white/95 p-8 shadow-xl shadow-emerald-500/10">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-emerald-500">
              <CloudUpload className="h-5 w-5 text-emerald-500" />
              Spreadsheet upload
            </div>
            <p className="text-sm text-slate-500">
              Have your data ready in a spreadsheet? Upload it directly and let
              SahayakAI verify the format instantly.
            </p>
            <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 p-6 text-center text-sm text-emerald-700">
              Drag & drop CSV file here
            </div>
            <Button
              variant="outline"
              className="rounded-xl border border-emerald-100 bg-white px-6 py-5 text-sm font-semibold text-emerald-600 hover:bg-emerald-50"
            >
              <CloudUpload className="h-4 w-4" /> Upload CSV file
            </Button>
            <Link
              href="/templates/monthly-data-template.csv"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
            >
              <FileDown className="h-4 w-4" /> Download template
            </Link>
          </div>

          <div className="flex flex-col gap-4 rounded-3xl border border-emerald-100 bg-white/95 p-8 shadow-xl shadow-emerald-500/10">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.32em] text-emerald-500">
              <Lightbulb className="h-5 w-5 text-emerald-500" />
              Quick guidance
            </div>
            <p className="text-sm text-slate-500">
              Need help preparing numbers or reconciling bank feeds? Jump into
              the AI advisor for an on-demand walkthrough tailored to your
              accounting tools.
            </p>
            <Button
              asChild
              className="rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-6 py-5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-emerald-500/30"
            >
              <Link href="/ai-advisor?prompt=Guide%20me%20through%20preparing%20monthly%20financial%20data%20for%20SahayakAI">
                Ask SahayakAI for help
              </Link>
            </Button>
          </div>
        </aside>
      </section>
    </div>
  );
}

function InputField({
  id,
  label,
  placeholder,
}: {
  id: string;
  label: string;
  placeholder?: string;
}) {
  return (
    <label
      className="grid gap-2 text-sm font-medium text-slate-700"
      htmlFor={id}
    >
      {label}
      <input
        id={id}
        placeholder={placeholder}
        className="w-full rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
    </label>
  );
}
