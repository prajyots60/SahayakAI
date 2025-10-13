import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4">
      <div className="max-w-md w-full">
        <div className="rounded-2xl border border-emerald-100 bg-white/95 p-8 shadow-2xl shadow-emerald-500/10">
          <h1 className="mb-2 text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="mb-8 text-sm text-slate-500">
            Login to your SahayakAI account
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-lg border border-emerald-100 bg-white px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-emerald-100 bg-white px-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <Button className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30">
              Sign In
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-emerald-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-8 text-center">
          <Button variant="ghost" asChild>
            <Link href="/" className="inline-flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
