import { Compass } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { BusinessProfile } from "../_data";

type SetupPanelProps = {
  showSetup: boolean;
  profile: BusinessProfile;
  formProduct: string;
  formCity: string;
  productCategories: string[];
  operatingCities: string[];
  onFormProductChange: (value: string) => void;
  onFormCityChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onEdit: () => void;
};

export function SetupPanel({
  showSetup,
  profile,
  formProduct,
  formCity,
  productCategories,
  operatingCities,
  onFormProductChange,
  onFormCityChange,
  onSubmit,
  onEdit,
}: SetupPanelProps) {
  return (
    <aside className="w-full max-w-sm space-y-5 rounded-3xl border border-emerald-100 bg-white/90 p-5 shadow-inner shadow-emerald-500/10">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-500">
            Setup
          </p>
          <h2 className="mt-1 text-lg font-semibold text-slate-900">
            Your opportunity lens
          </h2>
        </div>
        <Badge
          variant="outline"
          className="border-emerald-200/70 bg-emerald-50/70 text-[10px] font-semibold uppercase tracking-[0.26em] text-emerald-600"
        >
          {showSetup ? "Pending" : "Saved"}
        </Badge>
      </div>

      {showSetup ? (
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label
              htmlFor="productCategory"
              className="text-xs font-semibold tracking-[0.16em] text-slate-600"
            >
              Primary product category
            </Label>
            <Select value={formProduct} onValueChange={onFormProductChange}>
              <SelectTrigger className="h-11 rounded-xl border-emerald-100 bg-white text-sm text-slate-700">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border border-emerald-100 bg-white shadow-lg">
                {productCategories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="text-sm text-slate-700"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="baseCity"
              className="text-xs font-semibold tracking-[0.16em] text-slate-600"
            >
              Current city of operation
            </Label>
            <Select value={formCity} onValueChange={onFormCityChange}>
              <SelectTrigger className="h-11 rounded-xl border-emerald-100 bg-white text-sm text-slate-700">
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border border-emerald-100 bg-white shadow-lg">
                {operatingCities.map((city) => (
                  <SelectItem
                    key={city}
                    value={city}
                    className="text-sm text-slate-700"
                  >
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-emerald-500/30"
          >
            Generate opportunities
          </Button>
          <p className="text-[11px] leading-tight text-slate-400">
            We use this once to personalise the opportunity map. You can refine
            it anytime.
          </p>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-500">
              Focus product
            </p>
            <h3 className="mt-1 text-base font-semibold text-slate-900">
              {profile.productCategory}
            </h3>
            <p className="mt-2 text-xs text-slate-500">
              Demand benchmarking compares similar premium craft brands across
              28 cities.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-500">
              Base city
            </p>
            <h3 className="mt-1 text-base font-semibold text-slate-900">
              {profile.baseCity}
            </h3>
            <p className="mt-2 text-xs text-slate-500">
              Expansion picks favour demand pockets where your brand equity can
              travel fast.
            </p>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-center rounded-xl border border-dashed border-emerald-200/70 px-4 py-3 text-sm font-semibold text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50/50"
            onClick={onEdit}
          >
            Adjust inputs
          </Button>
        </div>
      )}

      <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Compass className="h-9 w-9 rounded-2xl bg-emerald-50 p-2 text-emerald-500" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-500">
              How it works
            </p>
            <p className="text-xs text-slate-500">
              We triangulate 24 data sources: GST filings, marketplace trends,
              and MSME credit signals.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
