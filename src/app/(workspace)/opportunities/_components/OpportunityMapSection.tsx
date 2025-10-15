import { useMemo } from "react";
import { ArrowRight, Filter, MapPinned } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import type {
  BusinessProfile,
  CityOpportunity,
  OpportunityTier,
} from "../_data";
import { opportunityFilters } from "../_data";
import { resolveScoreTone } from "./utils";

type OpportunityMapSectionProps = {
  profile: BusinessProfile;
  selectedTier: OpportunityTier;
  filteredCities: CityOpportunity[];
  selectedCity: CityOpportunity | null;
  onTierChange: (tier: OpportunityTier) => void;
  onSelectCity: (slug: string) => void;
};

export function OpportunityMapSection({
  profile,
  selectedTier,
  filteredCities,
  selectedCity,
  onTierChange,
  onSelectCity,
}: OpportunityMapSectionProps) {
  const spotlightCities = useMemo(
    () => filteredCities.slice(0, 2),
    [filteredCities]
  );

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-emerald-100 bg-white/90 p-5 shadow-inner shadow-emerald-500/5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-500">
            Opportunity map
          </p>
          <h2 className="text-lg font-semibold text-slate-900">
            Hotspots for {profile.productCategory}
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Filter className="hidden h-4 w-4 text-emerald-500 lg:block" />
          <div className="flex flex-wrap gap-2">
            {opportunityFilters.map((tier) => (
              <button
                key={tier}
                type="button"
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] transition",
                  selectedTier === tier
                    ? "border-emerald-300 bg-emerald-50 text-emerald-600 shadow"
                    : "border-transparent bg-white text-slate-500 hover:border-emerald-200/70 hover:bg-emerald-50/70 hover:text-emerald-600"
                )}
                onClick={() => onTierChange(tier)}
              >
                {tier}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[2.2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          aria-hidden
        >
          <svg
            viewBox="0 0 600 700"
            className="h-full w-full object-cover"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="mapGlow" cx="50%" cy="50%" r="65%">
                <stop offset="0%" stopColor="rgba(16,185,129,0.35)" />
                <stop offset="60%" stopColor="rgba(16,185,129,0.12)" />
                <stop offset="100%" stopColor="rgba(59,130,246,0.08)" />
              </radialGradient>
            </defs>
            <path
              d="M330 20c30 10 70 30 95 55s45 58 60 92c16 36 27 74 32 114 5 41 4 84-10 122-15 40-44 74-72 105-29 33-57 63-94 83-36 19-80 27-122 29s-82-1-115-22c-33-20-59-56-78-94-19-37-31-76-37-117-7-46-7-94 8-138 16-46 47-89 84-123s81-59 128-79 99-33 121-27z"
              fill="url(#mapGlow)"
            />
          </svg>
        </div>

        <div className="relative z-[1] h-[520px] w-full">
          {filteredCities.map((city) => {
            const tone = resolveScoreTone(city.score);
            const isSelected = selectedCity?.slug === city.slug;

            return (
              <button
                key={city.slug}
                type="button"
                className={cn(
                  "group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 rounded-full",
                  isSelected ? "z-20" : "z-10"
                )}
                style={{
                  left: city.coordinates.left,
                  top: city.coordinates.top,
                }}
                onClick={() => onSelectCity(city.slug)}
              >
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border text-sm font-semibold transition",
                    tone === "high" &&
                      "border-emerald-300 bg-emerald-500/90 text-white shadow-xl shadow-emerald-500/30",
                    tone === "medium" &&
                      "border-amber-300 bg-amber-400/90 text-white shadow-xl shadow-amber-500/30",
                    tone === "neutral" &&
                      "border-slate-300 bg-slate-200/90 text-slate-700 shadow-xl shadow-slate-400/30",
                    isSelected && "scale-110"
                  )}
                >
                  {city.score}
                </span>
                <div className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow">
                  {city.name}
                </div>
              </button>
            );
          })}

          {filteredCities.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-sm text-slate-500">
              <MapPinned className="mb-3 h-10 w-10 text-emerald-400" />
              <p className="font-semibold text-slate-900">
                No cities match this filter yet.
              </p>
              <p className="mt-1 max-w-xs text-xs text-slate-500">
                Try switching tiers to reveal more expansion hotspots.
              </p>
            </div>
          )}
        </div>

        <div className="relative z-[1] mt-6 grid gap-3 text-xs text-slate-500 sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            High opportunity (80-100)
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            Moderate play (60-79)
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-slate-300" />
            Saturated / Low data
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {spotlightCities.map((city) => (
          <div
            key={city.slug}
            className={cn(
              "rounded-3xl border border-emerald-100 bg-white/90 p-5 shadow-lg transition",
              selectedCity?.slug === city.slug
                ? "border-emerald-300 shadow-emerald-500/20"
                : "hover:-translate-y-1 hover:shadow-emerald-500/10"
            )}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-500">
                  Spotlight city
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">
                  {city.name}, {city.state}
                </h3>
              </div>
              <Badge
                variant="outline"
                className="border-emerald-200/70 bg-emerald-50/70 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-600"
              >
                Score {city.score}
              </Badge>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              {city.persona.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {city.topCustomerSegments.map((segment) => (
                <span
                  key={segment}
                  className="rounded-full border border-emerald-100 bg-emerald-50/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600"
                >
                  {segment}
                </span>
              ))}
            </div>
            <Button
              variant="ghost"
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-emerald-200/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600"
              onClick={() => onSelectCity(city.slug)}
            >
              View deep dive <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
