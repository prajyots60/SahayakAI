import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Sparkles, Users, Building } from "lucide-react";

const industries = [
  "Manufacturing",
  "Retail & Ecommerce",
  "Services",
  "Hospitality",
  "Agriculture",
  "Other",
];

const benefits = [
  "Launch with a personalised business health score",
  "Predictive risk alerts tailored to your industry",
  "Always-available AI advisor for MSME owners",
];

const proofPoints = [
  "Trusted by 10,000+ MSMEs across India",
  "2.3x faster cash flow visibility",
  "Bank-grade security & compliance",
];

function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M23.04 12.261c0-.815-.073-1.596-.209-2.348H12v4.444h6.213a5.309 5.309 0 0 1-2.304 3.484l-.003.197 3.348 2.6.232.023c2.135-1.97 3.554-4.866 3.554-8.4Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.956-1.08 7.942-2.94l-3.784-2.94c-1.02.69-2.324 1.1-4.158 1.1-3.19 0-5.898-2.153-6.868-5.05l-.178.015-3.7 2.865-.048.173C3.206 21.44 7.246 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.132 14.17A7.2 7.2 0 0 1 4.74 12c0-.755.13-1.49.366-2.17l-.006-.218-3.74-2.91-.123.058A11.964 11.964 0 0 0 0 12c0 1.9.452 3.698 1.261 5.24l3.871-3.07Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c2.252 0 3.77.976 4.638 1.79l3.387-3.295C17.944 1.18 15.24 0 12 0 7.246 0 3.206 2.56 1.261 6.76l3.845 3.07C5.102 6.933 7.81 4.75 12 4.75Z"
      />
    </svg>
  );
}

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-emerald-100 bg-white/95 shadow-2xl shadow-emerald-500/10 lg:grid-cols-2">
        <div className="relative flex flex-col justify-between bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 p-10 text-white/90">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -left-16 top-12 h-36 w-36 rounded-full bg-emerald-300 blur-3xl" />
            <div className="absolute bottom-8 right-0 h-48 w-48 rounded-full bg-teal-400 blur-3xl" />
          </div>

          <div className="relative space-y-12">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl font-semibold text-white">
                SA
              </div>
              <p className="text-lg font-semibold tracking-wide text-white">
                SahayakAI
              </p>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-white/80">
                Create your workspace
              </div>
              <h2 className="text-3xl font-semibold text-white">
                Stop reacting to surprises. Start steering your business with
                confidence.
              </h2>
              <p className="text-sm text-emerald-50/85">
                SahayakAI gives you a single command centre for cash flow,
                compliance, and growth moves tailored to Indian businesses.
              </p>
            </div>

            <div className="space-y-3 text-sm text-emerald-50/85">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 h-4 w-4 text-white" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative space-y-4 rounded-2xl border border-white/15 bg-white/10 p-4 text-xs text-emerald-50/90">
            <p className="font-semibold text-white">
              Prefer a concierge onboarding?
            </p>
            <p>
              Email{" "}
              <Link
                href="mailto:onboarding@sahayakai.in"
                className="font-medium text-white underline"
              >
                onboarding@sahayakai.in
              </Link>{" "}
              or WhatsApp <span className="font-medium">+91 9876 000 123</span>{" "}
              for a guided setup.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-10 p-10">
          <div className="flex justify-end">
            <Button variant="ghost" asChild>
              <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-emerald-700 hover:text-emerald-800"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
              </Link>
            </Button>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold text-slate-900">
                Create your account
              </h1>
              <p className="text-sm text-slate-500">
                Unlock your business health command centre in minutes. No credit
                card required during early access.
              </p>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                type="button"
                className="w-full rounded-xl border border-emerald-100 bg-white/90 py-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-emerald-50"
              >
                <GoogleIcon />
                Sign up with Google
              </Button>
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-slate-400">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                or sign up with email
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
              </div>
            </div>

            <form className="grid gap-4">
              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-slate-700"
                  htmlFor="business"
                >
                  Business name
                </label>
                <input
                  id="business"
                  type="text"
                  placeholder="Sharma Textiles"
                  className="w-full rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-slate-700"
                  htmlFor="name"
                >
                  Your name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Priya Sharma"
                  className="w-full rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-slate-700"
                  htmlFor="industry"
                >
                  Industry
                </label>
                <div className="relative">
                  <select
                    id="industry"
                    className="w-full appearance-none rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select your industry
                    </option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                  <Building className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-400" />
                </div>
              </div>

              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-slate-700"
                  htmlFor="email"
                >
                  Work email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@business.in"
                  className="w-full rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-slate-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  className="w-full rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>By continuing you agree to our</span>
                <Link
                  href="/terms"
                  className="font-semibold text-emerald-600 hover:underline"
                >
                  Terms
                </Link>
                <span>&</span>
                <Link
                  href="/privacy"
                  className="font-semibold text-emerald-600 hover:underline"
                >
                  Privacy Policy
                </Link>
              </div>

              <Button className="mt-2 w-full rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 py-6 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-emerald-500/30">
                Create account & start trial
              </Button>
            </form>
          </div>

          <div className="flex items-center justify-between text-sm text-slate-500">
            <div className="flex items-center gap-2 text-emerald-600">
              <Users className="h-4 w-4" />
              <span>Join a network of forward-looking businesses</span>
            </div>
            <Link
              href="/login"
              className="font-semibold text-emerald-700 hover:underline"
            >
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
