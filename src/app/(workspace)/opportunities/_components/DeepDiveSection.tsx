import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  MapPinned,
  Sparkles,
  Target,
  TrendingUp,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type { BusinessProfile, CityOpportunity } from "../_data";
import { MetricGauge } from "./MetricGauge";
import { MiniSparkline } from "./MiniSparkline";
import { OpportunityGauge } from "./OpportunityGauge";

type DeepDiveSectionProps = {
  profile: BusinessProfile;
  selectedCity: CityOpportunity;
  recommendedCities: CityOpportunity[];
  onSelectCity: (slug: string) => void;
};

export function DeepDiveSection({
  profile,
  selectedCity,
  recommendedCities,
  onSelectCity,
}: DeepDiveSectionProps) {
  return (
    <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
      <article className="rounded-3xl border border-emerald-100/80 bg-white/95 p-7 shadow-xl shadow-emerald-500/10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-500">
              Deep dive report
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">
              {profile.productCategory} × {selectedCity.name}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Opportunity snapshot powered by search demand, commerce signals,
              and competitive scraping updated in the last 24 hours.
            </p>
          </div>
          <Badge
            variant="outline"
            className="border-emerald-200/70 bg-emerald-50/70 text-[10px] font-semibold uppercase tracking-[0.26em] text-emerald-600"
          >
            Last refreshed: 12 mins ago
          </Badge>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-[220px_1fr]">
          <OpportunityGauge score={selectedCity.score} />
          <div className="grid gap-4 md:grid-cols-2">
            <MetricGauge
              label="Demand signals"
              score={selectedCity.demandScore}
              description="Composite of search, social & marketplace velocity"
            />
            <MetricGauge
              label="Competition landscape"
              score={100 - selectedCity.competitionScore}
              labelFormatter={(score) =>
                score >= 80
                  ? "Wide open"
                  : score >= 60
                  ? "Manageable"
                  : "Crowded"
              }
              description="Lower score is better — fewer premium players active"
            />
            <MiniSparkline
              label="Growth trend"
              data={selectedCity.growthTrend}
              description="12-month indexed search interest"
            />
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-500">
                Go-to-market CTA
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Draft a launch sprint tailored to {selectedCity.name} and rally
                your team in minutes.
              </p>
              <Button
                asChild
                className="mt-4 w-full rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-emerald-500/20"
              >
                <Link href={`/advisor?focus=${selectedCity.slug}-launch`}>
                  Ask SahayakAI for a Go-to-Market Plan
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-inner">
            <div className="flex items-start gap-3">
              <Users2 className="mt-1 h-8 w-8 rounded-2xl bg-emerald-50 p-2 text-emerald-500" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-500">
                  Target customer persona
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">
                  {selectedCity.persona.title}
                </h3>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              {selectedCity.persona.description}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {selectedCity.persona.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-inner">
            <div className="flex items-start gap-3">
              <Target className="mt-1 h-8 w-8 rounded-2xl bg-emerald-50 p-2 text-emerald-500" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-500">
                  Actionable plays
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">
                  3-week entry sprint
                </h3>
              </div>
            </div>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {selectedCity.strategyPlays.map((play) => (
                <li
                  key={play}
                  className="rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3"
                >
                  {play}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-inner">
          <div className="flex items-start gap-3">
            <TrendingUp className="mt-1 h-8 w-8 rounded-2xl bg-emerald-50 p-2 text-emerald-500" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-500">
                Why this matters
              </p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">
                Signals backing {selectedCity.name}
              </h3>
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {selectedCity.opportunitySignals.map((signal) => (
              <div
                key={signal}
                className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 text-sm text-slate-600"
              >
                {signal}
              </div>
            ))}
          </div>
        </div>
      </article>

      <aside className="space-y-5">
        <div className="rounded-3xl border border-emerald-100/80 bg-white/95 p-6 shadow-xl shadow-emerald-500/10">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-1 h-8 w-8 rounded-2xl bg-emerald-50 p-2 text-emerald-500" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-500">
                Playbook summary
              </p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">
                Launch ritual
              </h3>
            </div>
          </div>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <ArrowUpRight className="mt-1 h-4 w-4 text-emerald-500" />
              Warm up leads with persona-led storytelling 10 days before entry.
            </li>
            <li className="flex items-start gap-2">
              <ArrowUpRight className="mt-1 h-4 w-4 text-emerald-500" />
              Land with a flagship experience inside a trusted local community.
            </li>
            <li className="flex items-start gap-2">
              <ArrowUpRight className="mt-1 h-4 w-4 text-emerald-500" />
              Convert interest by packaging fast, concierge-style delivery
              offers.
            </li>
          </ul>
          <Button
            asChild
            variant="outline"
            className="mt-5 w-full rounded-xl border-emerald-200/70 bg-white px-4 py-3 text-sm font-semibold text-emerald-600 hover:bg-emerald-50"
          >
            <Link
              href={
                selectedCity
                  ? `/data-input?prefill=${selectedCity.slug}`
                  : "/data-input"
              }
            >
              Prepare data inputs
            </Link>
          </Button>
        </div>

        <div className="rounded-3xl border border-emerald-100 bg-white/90 p-6 shadow-xl shadow-emerald-500/10">
          <div className="flex items-start gap-3">
            <MapPinned className="mt-1 h-8 w-8 rounded-2xl bg-emerald-50 p-2 text-emerald-500" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-500">
                Your shortlist
              </p>
              <h3 className="mt-1 text-lg font-semibold text-slate-900">
                Top 5 expansion bets
              </h3>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {recommendedCities.slice(0, 5).map((city) => (
              <button
                key={city.slug}
                type="button"
                onClick={() => onSelectCity(city.slug)}
                className={cn(
                  "w-full rounded-2xl border px-4 py-3 text-left text-sm transition",
                  selectedCity.slug === city.slug
                    ? "border-emerald-300 bg-emerald-50/80 text-emerald-700 shadow-md"
                    : "border-emerald-100 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50/60"
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {city.name} • {city.tier}
                    </p>
                    <p className="text-xs text-slate-500">
                      Score {city.score} · Demand {city.demandScore}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-emerald-500" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}
