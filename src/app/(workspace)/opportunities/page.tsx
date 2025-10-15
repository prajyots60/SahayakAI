"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  cityOpportunities,
  initialProfile,
  operatingCities,
  productCategories,
  type BusinessProfile,
  type CityOpportunity,
  type OpportunityTier,
} from "./_data";
import { DeepDiveSection } from "./_components/DeepDiveSection";
import { OpportunityMapSection } from "./_components/OpportunityMapSection";
import { SetupPanel } from "./_components/SetupPanel";

function useCityRecommendations(profile: BusinessProfile): CityOpportunity[] {
  return useMemo(() => {
    const matching = cityOpportunities.filter((city) =>
      city.recommendedCategories.includes(profile.productCategory)
    );

    if (matching.length > 0) {
      return matching.sort((a, b) => b.score - a.score);
    }

    return [...cityOpportunities].sort((a, b) => b.score - a.score);
  }, [profile.productCategory]);
}

export default function OpportunitiesPage() {
  const [profile, setProfile] = useState<BusinessProfile>(initialProfile);
  const [showSetup, setShowSetup] = useState(true);
  const [selectedTier, setSelectedTier] = useState<OpportunityTier>("All");
  const [selectedCitySlug, setSelectedCitySlug] = useState<string | null>(null);
  const [formProduct, setFormProduct] = useState(
    initialProfile.productCategory
  );
  const [formCity, setFormCity] = useState(initialProfile.baseCity);

  const openSetup = () => {
    setFormProduct(profile.productCategory);
    setFormCity(profile.baseCity);
    setShowSetup(true);
  };

  const recommendedCities = useCityRecommendations(profile);

  const filteredCities = useMemo(() => {
    if (selectedTier === "All") return recommendedCities;
    return recommendedCities.filter((city) => city.tier === selectedTier);
  }, [recommendedCities, selectedTier]);

  const selectedCity = useMemo(() => {
    if (filteredCities.length === 0) {
      return recommendedCities[0] ?? null;
    }

    if (selectedCitySlug) {
      const found = filteredCities.find(
        (city) => city.slug === selectedCitySlug
      );
      if (found) return found;
    }

    return filteredCities[0] ?? null;
  }, [filteredCities, recommendedCities, selectedCitySlug]);

  const handleProfileSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setProfile({
      productCategory: formProduct,
      baseCity: formCity,
    });
    setShowSetup(false);
    setSelectedTier("All");
    setSelectedCitySlug(null);
  };

  const opportunityDensity = filteredCities.length;

  return (
    <div className="flex flex-col gap-6">
      <header className="rounded-3xl border border-emerald-100/80 bg-white/95 p-7 shadow-xl shadow-emerald-500/10">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="space-y-3">
            <Badge
              variant="outline"
              className="border-emerald-200/70 bg-emerald-50/70 text-[10px] font-semibold uppercase tracking-[0.32em] text-emerald-600"
            >
              Market Expansion Advisor
            </Badge>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold text-slate-900">
                Where should{" "}
                <span className="text-emerald-600">
                  {profile.productCategory}
                </span>{" "}
                go next from {profile.baseCity}?
              </h1>
              <p className="max-w-2xl text-sm text-slate-500">
                We analysed demand signals, competition intensity, and buyer
                personas across India to surface the next three cities where
                your craft can thrive.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-xs font-semibold uppercase tracking-[0.26em] text-emerald-600 shadow-sm">
              {opportunityDensity} live opportunities
            </div>
            <Button
              variant="outline"
              className="rounded-xl border-emerald-200/70 bg-white px-4 py-3 text-sm font-semibold text-emerald-600 hover:bg-emerald-50"
              onClick={openSetup}
            >
              Edit setup
            </Button>
            <Button
              asChild
              className="rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-emerald-500/30"
            >
              <Link href="/advisor?focus=market-expansion">
                Ask SahayakAI for a Go-to-Market Plan
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative rounded-3xl border border-emerald-100/60 bg-white/95 p-6 shadow-xl shadow-emerald-500/10">
        <div className="flex flex-col gap-6 lg:flex-row">
          <SetupPanel
            showSetup={showSetup}
            profile={profile}
            formProduct={formProduct}
            formCity={formCity}
            productCategories={productCategories}
            operatingCities={operatingCities}
            onFormProductChange={setFormProduct}
            onFormCityChange={setFormCity}
            onSubmit={handleProfileSubmit}
            onEdit={openSetup}
          />

          <div className="flex-1 space-y-5">
            <OpportunityMapSection
              profile={profile}
              selectedTier={selectedTier}
              filteredCities={filteredCities}
              selectedCity={selectedCity}
              onTierChange={(tier) => {
                setSelectedTier(tier);
                setSelectedCitySlug(null);
              }}
              onSelectCity={setSelectedCitySlug}
            />
          </div>
        </div>
      </section>

      {selectedCity && (
        <DeepDiveSection
          profile={profile}
          selectedCity={selectedCity}
          recommendedCities={recommendedCities}
          onSelectCity={setSelectedCitySlug}
        />
      )}
    </div>
  );
}
