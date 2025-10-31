"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CloudUpload, FileDown, Lightbulb, TrendingUp } from "lucide-react";

const industries = [
  "Manufacturing",
  "Services",
  "Retail",
  "Food Processing",
  "Handicrafts",
];

const subSectors: Record<string, string[]> = {
  "Manufacturing": ["Leather", "Wood Products", "Rubber and Plastic", "Others"],
  "Services": ["Consultancy", "IT Services", "Transport/Logistics", "Others"],
  "Retail": ["Fashion & Apparel", "Grocery", "Electronics", "Others"],
  "Food Processing": ["Bakery", "Dairy Products", "Packaged Food","Others"],
  "Handicrafts": ["Pottery", "Textiles", "Wood Crafts","Others"],
};

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

export default function DataInputPage() {
  const [industry, setIndustry] = useState<string>("Manufacturing");
  const [subSector, setSubSector] = useState<string>("Leather");
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          revenue: (document.getElementById('revenue') as HTMLInputElement)?.value || '0',
          expenses: (document.getElementById('expenses') as HTMLInputElement)?.value || '0',
          cash_on_hand: (document.getElementById('cash_on_hand') as HTMLInputElement)?.value || '0',
          num_employees: (document.getElementById('num_employees') as HTMLInputElement)?.value || '0',
          industry,
          sub_sector: subSector,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error('Prediction error:', error);
      setPrediction({ error: 'Failed to get prediction. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

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
            <div className="grid gap-4 md:grid-cols-2">
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
              <div className="grid gap-2">
                <label
                  htmlFor="sub_sector"
                  className="text-sm font-semibold uppercase tracking-[0.26em] text-emerald-500"
                >
                  Sub-Sector
                </label>
                <select
                  id="sub_sector"
                  className="w-full rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  value={subSector}
                  onChange={(event) => setSubSector(event.target.value)}
                >
                  {subSectors[industry]?.map((option: string) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <fieldset className="grid gap-4 rounded-2xl border border-emerald-100 bg-white/90 p-6">
              <legend className="px-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-500">
                Financials
              </legend>
              <div className="grid gap-4 md:grid-cols-3">
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
                <InputField
                  id="cash_on_hand"
                  label="Cash on Hand (₹ lakh)"
                  placeholder="50"
                />
              </div>
            </fieldset>

            <fieldset className="grid gap-4 rounded-2xl border border-emerald-100 bg-white/90 p-6">
              <legend className="px-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-500">
                Operations
              </legend>
              <div className="grid gap-4 md:grid-cols-3">
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
                  id="num_employees"
                  label="Number of Employees"
                  placeholder="10"
                />
              </div>
            </fieldset>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button
              onClick={handlePredict}
              disabled={loading}
              className="rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-6 py-5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-emerald-500/30"
            >
              {loading ? 'Predicting...' : 'Predict Risk'}
            </Button>
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

          {prediction && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-3xl border border-emerald-100 p-8 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-900">Risk Assessment Results</h3>
                  <button
                    onClick={() => setPrediction(null)}
                    className="text-slate-400 hover:text-slate-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {prediction.error ? (
                  <div className="text-center py-8">
                    <p className="text-red-600 text-lg">{prediction.error}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full text-lg font-semibold ${
                        prediction.predicted_class === 1
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {prediction.predicted_class === 1 ? '⚠️ High Risk' : '✅ Low Risk'}
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <div className="bg-slate-50 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-slate-700">Risk Probability:</span>
                          <span className="text-2xl font-bold text-slate-900">{prediction.probability}%</span>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-slate-700">Business Health Score:</span>
                          <span className="text-2xl font-bold text-slate-900">{prediction.business_health_score}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4">
                      <h4 className="font-semibold text-slate-900 mb-2">Analysis Summary</h4>
                      <p className="text-slate-700">{prediction.reasoning_summary}</p>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4">
                      <h4 className="font-semibold text-slate-900 mb-3">Key Factors</h4>
                      <div className="space-y-2">
                        {Object.entries(prediction.feature_contributions).map(([feature, value]) => {
                          const numValue = typeof value === 'number' ? value : parseFloat(value as string) || 0;
                          const displayName = {
                            'Profit_Margin': 'Profit Margin',
                            'Cash_to_Expense': 'Cash to Expense Ratio',
                            'Revenue_per_Employee': 'Revenue per Employee',
                            'Industry': 'Industry Type',
                            'Sub_Sector': 'Sub Sector'
                          }[feature] || feature.replace(/_/g, ' ');

                          const impact = numValue > 0 ? 'Increases Risk' : 'Decreases Risk';
                          const impactColor = numValue > 0 ? 'text-red-600' : 'text-green-600';

                          return (
                            <div key={feature} className="flex justify-between items-center">
                              <div className="flex flex-col">
                                <span className="text-sm text-slate-600">{displayName}</span>
                                <span className={`text-xs ${impactColor}`}>{impact}</span>
                              </div>
                              <span className={`text-sm font-medium ${impactColor}`}>
                                {numValue > 0 ? '+' : ''}{numValue.toFixed(3)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={() => setPrediction(null)}
                        className="flex-1 rounded-xl bg-emerald-500 hover:bg-emerald-600 px-6 py-3 text-sm font-semibold text-white"
                      >
                        Close
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 rounded-xl border border-emerald-100 bg-white px-6 py-3 text-sm font-semibold text-emerald-600 hover:bg-emerald-50"
                      >
                        Get Recommendations
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
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
