"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const msmeSchema = z.object({
  industry: z.string().min(2, "Select or enter your industry"),
  location: z.string().min(2, "Enter your city or state"),
  entityType: z.string().min(2, "Enter your entity type"),
  annualTurnoverRange: z.string().min(1, "Select your range"),
  employeeCountRange: z.string().min(1, "Select your range"),
});

export default function OnboardingPage() {
  const params = useSearchParams();
  const router = useRouter();
  const role = params.get("role") || "MSME_OWNER";
  const userId = params.get("userId");

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl border border-emerald-100 bg-white p-8 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900">
            Welcome — let's get you set up
          </h1>
          <Link href="/" className="text-sm text-emerald-700 hover:underline">
            Skip for now
          </Link>
        </div>

        {isInvestor ? (
          <div className="space-y-4">
            <p className="text-slate-600">
              Investor onboarding is coming next. For now, you can proceed to
              explore.
            </p>
            <Button onClick={() => router.push("/investor")}>
              Go to Investor Home
            </Button>
          </div>
        ) : (
          <Form {...msmeForm}>
            <form
              onSubmit={msmeForm.handleSubmit(submitMsme)}
              className="grid gap-4"
            >
              <FormField
                control={msmeForm.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Manufacturing" {...field} />
                    </FormControl>
                    <FormDescription>
                      We'll tailor risk alerts to your industry.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={msmeForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="City, State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={msmeForm.control}
                name="entityType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entity Type</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Proprietorship / Pvt Ltd / LLP"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={msmeForm.control}
                  name="annualTurnoverRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Annual Turnover (range)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 10L–25L" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={msmeForm.control}
                  name="employeeCountRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employee Count (range)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 10–50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {error ? <p className="text-sm text-red-600">{error}</p> : null}

              <Button type="submit" disabled={saving} className="mt-2">
                {saving ? "Saving..." : "Continue"}
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
