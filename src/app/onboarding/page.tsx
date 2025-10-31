"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import {
  Building2,
  MapPin,
  Users,
  TrendingUp,
  Briefcase,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

const INDUSTRIES = [
  "Manufacturing",
  "Retail & E-commerce",
  "Services",
  "Hospitality",
  "Agriculture",
  "Healthcare",
  "Technology",
  "Construction",
  "Education",
  "Other",
];

const ENTITY_TYPES = [
  "Sole Proprietorship",
  "Partnership",
  "Private Limited (Pvt Ltd)",
  "Limited Liability Partnership (LLP)",
  "Public Limited",
  "One Person Company (OPC)",
];

const TURNOVER_RANGES = [
  "Below ₹5 Lakhs",
  "₹5L - ₹10L",
  "₹10L - ₹25L",
  "₹25L - ₹50L",
  "₹50L - ₹1 Crore",
  "₹1Cr - ₹5Cr",
  "₹5Cr - ₹10Cr",
  "Above ₹10 Crores",
];

const EMPLOYEE_RANGES = [
  "1-5",
  "6-10",
  "11-25",
  "26-50",
  "51-100",
  "101-250",
  "250+",
];

const msmeSchema = z.object({
  industry: z.string().min(1, "Please select your industry"),
  location: z.string().min(2, "Enter your city or state"),
  entityType: z.string().min(1, "Please select your entity type"),
  annualTurnoverRange: z.string().min(1, "Please select your turnover range"),
  employeeCountRange: z.string().min(1, "Please select your employee count"),
});

const STEPS = [
  {
    id: 1,
    title: "Business Type",
    description: "Tell us about your business structure",
    icon: Building2,
    fields: ["industry", "entityType"],
  },
  {
    id: 2,
    title: "Location & Size",
    description: "Help us understand your operations",
    icon: MapPin,
    fields: ["location", "annualTurnoverRange", "employeeCountRange"],
  },
];

export default function OnboardingPage() {
  const params = useSearchParams();
  const router = useRouter();
  const role = params.get("role") || "MSME_OWNER";
  const userId = params.get("userId");

  const [currentStep, setCurrentStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const msmeForm = useForm<z.infer<typeof msmeSchema>>({
    resolver: zodResolver(msmeSchema),
    defaultValues: {
      industry: "",
      location: "",
      entityType: "",
      annualTurnoverRange: "",
      employeeCountRange: "",
    },
  });

  const isInvestor = useMemo(() => role === "INVESTOR", [role]);

  const submitMsme = async (values: z.infer<typeof msmeSchema>) => {
    if (!userId) {
      setError("Missing user context. Please sign in again.");
      return;
    }
    try {
      setSaving(true);
      setError(null);
      const res = await fetch("/api/onboarding/msme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ...values }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data?.errors?.[0]?.message || "Failed to save");
      }
      router.push("/dashboard");
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const validateCurrentStep = async () => {
    const currentFields = STEPS[currentStep - 1].fields as Array<
      keyof z.infer<typeof msmeSchema>
    >;
    const isValid = await msmeForm.trigger(currentFields);
    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-10">
      <div className="w-full max-w-4xl">
        {/* Progress Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-lg">
              <Sparkles className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">SahayakAI</h1>
          </div>
          <p className="text-slate-600">
            Let's set up your business profile in just 2 quick steps
          </p>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-2xl">
          {/* Step Progress */}
          {!isInvestor && (
            <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 px-8 py-6">
              <div className="flex items-center justify-between">
                {STEPS.map((step, index) => (
                  <div key={step.id} className="flex flex-1 items-center">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                          currentStep >= step.id
                            ? "border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                            : "border-slate-300 bg-white text-slate-400"
                        }`}
                      >
                        {currentStep > step.id ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <step.icon className="h-5 w-5" />
                        )}
                      </div>
                      <div className="hidden md:block">
                        <p
                          className={`text-sm font-semibold ${
                            currentStep >= step.id
                              ? "text-emerald-900"
                              : "text-slate-400"
                          }`}
                        >
                          {step.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    {index < STEPS.length - 1 && (
                      <div className="mx-4 h-0.5 flex-1 bg-slate-200">
                        <div
                          className={`h-full transition-all ${
                            currentStep > step.id
                              ? "w-full bg-emerald-600"
                              : "w-0"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content Area */}
          <div className="p-8 md:p-12">
            {isInvestor ? (
              <div className="space-y-8 text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-teal-100">
                  <TrendingUp className="h-12 w-12 text-emerald-600" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Investor Portal Coming Soon
                  </h2>
                  <p className="mx-auto max-w-md text-slate-600">
                    We're crafting an exceptional experience for investors. In
                    the meantime, explore our platform and discover
                    opportunities.
                  </p>
                </div>
                <Button
                  onClick={() => router.push("/dashboard")}
                  size="lg"
                  className="h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5"
                >
                  Explore Platform
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Form {...msmeForm}>
                <form
                  onSubmit={msmeForm.handleSubmit(submitMsme)}
                  className="space-y-8"
                >
                  {/* Step 1: Business Type */}
                  {currentStep === 1 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="space-y-2 text-center">
                        <h2 className="text-2xl font-bold text-slate-900">
                          Tell us about your business
                        </h2>
                        <p className="text-slate-600">
                          This helps us customize your dashboard and insights
                        </p>
                      </div>

                      <div className="space-y-6">
                        <FormField
                          control={msmeForm.control}
                          name="industry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2 text-base font-semibold text-slate-700">
                                <Building2 className="h-5 w-5 text-emerald-600" />
                                Industry Sector
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-14 rounded-xl border-2 border-emerald-100 bg-white text-base shadow-sm transition hover:border-emerald-200 focus:border-emerald-500">
                                    <SelectValue placeholder="Select your industry" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {INDUSTRIES.map((industry) => (
                                    <SelectItem
                                      key={industry}
                                      value={industry}
                                      className="text-base"
                                    >
                                      {industry}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription className="text-sm">
                                We'll provide industry-specific compliance
                                alerts and insights
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={msmeForm.control}
                          name="entityType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2 text-base font-semibold text-slate-700">
                                <Briefcase className="h-5 w-5 text-emerald-600" />
                                Business Structure
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-14 rounded-xl border-2 border-emerald-100 bg-white text-base shadow-sm transition hover:border-emerald-200 focus:border-emerald-500">
                                    <SelectValue placeholder="Select your entity type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {ENTITY_TYPES.map((type) => (
                                    <SelectItem
                                      key={type}
                                      value={type}
                                      className="text-base"
                                    >
                                      {type}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormDescription className="text-sm">
                                Helps us recommend relevant financial structures
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Location & Size */}
                  {currentStep === 2 && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="space-y-2 text-center">
                        <h2 className="text-2xl font-bold text-slate-900">
                          Where and how big?
                        </h2>
                        <p className="text-slate-600">
                          Help us understand your operations scale
                        </p>
                      </div>

                      <div className="space-y-6">
                        <FormField
                          control={msmeForm.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="flex items-center gap-2 text-base font-semibold text-slate-700">
                                <MapPin className="h-5 w-5 text-emerald-600" />
                                Business Location
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., Mumbai, Maharashtra"
                                  className="h-14 rounded-xl border-2 border-emerald-100 text-base shadow-sm transition hover:border-emerald-200 focus:border-emerald-500"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription className="text-sm">
                                We'll track state-specific compliance
                                requirements
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid gap-6 md:grid-cols-2">
                          <FormField
                            control={msmeForm.control}
                            name="annualTurnoverRange"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2 text-base font-semibold text-slate-700">
                                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                                  Annual Turnover
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="h-14 rounded-xl border-2 border-emerald-100 bg-white text-base shadow-sm transition hover:border-emerald-200 focus:border-emerald-500">
                                      <SelectValue placeholder="Select range" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {TURNOVER_RANGES.map((range) => (
                                      <SelectItem
                                        key={range}
                                        value={range}
                                        className="text-base"
                                      >
                                        {range}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={msmeForm.control}
                            name="employeeCountRange"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="flex items-center gap-2 text-base font-semibold text-slate-700">
                                  <Users className="h-5 w-5 text-emerald-600" />
                                  Team Size
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="h-14 rounded-xl border-2 border-emerald-100 bg-white text-base shadow-sm transition hover:border-emerald-200 focus:border-emerald-500">
                                      <SelectValue placeholder="Select range" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {EMPLOYEE_RANGES.map((range) => (
                                      <SelectItem
                                        key={range}
                                        value={range}
                                        className="text-base"
                                      >
                                        {range} employees
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Error Display */}
                  {error && (
                    <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4">
                      <p className="text-center text-sm font-medium text-red-800">
                        {error}
                      </p>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      disabled={currentStep === 1}
                      className="h-12 rounded-xl border-2 px-6"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>

                    <div className="flex items-center gap-3">
                      <Link
                        href="/dashboard"
                        className="text-sm text-slate-500 transition hover:text-slate-700 hover:underline"
                      >
                        Skip for now
                      </Link>

                      {currentStep < STEPS.length ? (
                        <Button
                          type="button"
                          onClick={handleNext}
                          className="h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5"
                        >
                          Continue
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          disabled={saving}
                          className="h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-8 shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 disabled:opacity-70"
                        >
                          {saving ? (
                            <>
                              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                              Setting up...
                            </>
                          ) : (
                            <>
                              Complete Setup
                              <CheckCircle2 className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            🔒 Your data is encrypted and secure. We never share your
            information.
          </p>
        </div>
      </div>
    </div>
  );
}
