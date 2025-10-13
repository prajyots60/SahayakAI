"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-700" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_60%)]" />
      <div className="relative mx-auto w-full max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-100/80">
            Final call
          </p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Ready to secure your business’s future?
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-emerald-50/90">
            Start with a free health score today. Within minutes you’ll know
            where the risks are and the exact actions to take.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="h-12 w-full rounded-xl bg-white px-6 text-sm font-semibold text-emerald-700 transition hover:-translate-y-0.5 hover:bg-emerald-50 sm:w-auto"
          >
            <Link href="/signup">
              Sign up now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Link
            href="mailto:team@sahayakai.in"
            className="h-12 w-full rounded-xl border border-emerald-200/70 px-6 text-sm font-semibold text-emerald-50 transition hover:border-white/60 hover:text-white sm:w-auto"
          >
            Talk to our team
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-100/80">
          <span>No credit card required</span>
          <span className="hidden h-1 w-1 rounded-full bg-emerald-300/70 sm:block" />
          <span>Data encrypted at rest and in transit</span>
          <span className="hidden h-1 w-1 rounded-full bg-emerald-300/70 sm:block" />
          <span>Cancel anytime</span>
        </div>
      </div>
    </section>
  );
}
