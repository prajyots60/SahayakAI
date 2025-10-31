"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, ExternalLink, Filter, Search, TrendingUp } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Scheme {
  Scheme_Name: string;
  Description: string;
  Type: string;
  Who_Can_Apply: string;
  Official_Link: string;
  similarity?: number;
}

const sectors = [
  "Manufacturing",
  "Services",
  "Retail",
  "Food Processing",
  "Handicrafts",
  "Textile",
  "IT",
  "Agriculture",
  "Others"
];

const locations = [
  "Maharashtra",
  "Delhi",
  "Karnataka",
  "Tamil Nadu",
  "Uttar Pradesh",
  "Gujarat",
  "Rajasthan",
  "West Bengal",
  "Others"
];

const schemeTypes = [
  "Loan",
  "Subsidy",
  "Training",
  "Grant",
  "Credit",
  "Others"
];

export default function GovernmentSchemesPage() {
  const [profile, setProfile] = useState({
    sector: "",
    location: "",
    enterprise_type: "",
    enterprise_size: "",
    women_led: false,
    description: ""
  });
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [filteredSchemes, setFilteredSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    sector: "",
    search: ""
  });

  const handleProfileChange = (field: string, value: string | boolean) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleRecommend = async () => {
    setLoading(true);
    setError("");

    try {
      const profileText = `${profile.sector} ${profile.location} ${profile.enterprise_type} ${profile.enterprise_size} ${profile.women_led ? 'women-led' : ''} ${profile.description}`.trim();

      if (!profileText) {
        throw new Error("Please provide at least some profile information");
      }

      const response = await fetch('/api/schemes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ profile: profileText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSchemes(data.schemes);
      setFilteredSchemes(data.schemes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get recommendations');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field: string, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);

    let filtered = schemes;

    if (newFilters.type && newFilters.type !== "all") {
      filtered = filtered.filter(scheme => scheme.Type.toLowerCase().includes(newFilters.type.toLowerCase()));
    }

    if (newFilters.sector && newFilters.sector !== "all") {
      filtered = filtered.filter(scheme =>
        scheme.Description.toLowerCase().includes(newFilters.sector.toLowerCase()) ||
        scheme.Who_Can_Apply.toLowerCase().includes(newFilters.sector.toLowerCase())
      );
    }

    if (newFilters.search) {
      filtered = filtered.filter(scheme =>
        scheme.Scheme_Name.toLowerCase().includes(newFilters.search.toLowerCase()) ||
        scheme.Description.toLowerCase().includes(newFilters.search.toLowerCase())
      );
    }

    setFilteredSchemes(filtered);
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-3 sm:px-0">
      <header className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-100/70 bg-emerald-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">
          Government schemes
        </div>
        <h1 className="text-3xl font-semibold text-slate-900">
          Find Eligible Government Schemes
        </h1>
        <p className="max-w-2xl text-sm text-slate-500">
          Discover government schemes tailored to your business profile using AI-powered recommendations and eligibility matching.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        {/* Profile Input Section */}
        <div className="space-y-6">
          <Card className="rounded-3xl border border-emerald-100 bg-white/95 shadow-xl shadow-emerald-500/10">
            <CardHeader>
              <CardTitle className="text-lg text-slate-900">Business Profile</CardTitle>
              <CardDescription>Provide details about your MSME to get personalized recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="sector" className="text-sm font-semibold uppercase tracking-[0.26em] text-emerald-500">
                  Sector
                </Label>
                <Select value={profile.sector} onValueChange={(value) => handleProfileChange('sector', value)}>
                  <SelectTrigger className="rounded-xl border border-emerald-100 bg-white">
                    <SelectValue placeholder="Select sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location" className="text-sm font-semibold uppercase tracking-[0.26em] text-emerald-500">
                  Location
                </Label>
                <Select value={profile.location} onValueChange={(value) => handleProfileChange('location', value)}>
                  <SelectTrigger className="rounded-xl border border-emerald-100 bg-white">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="enterprise_type" className="text-sm font-semibold uppercase tracking-[0.26em] text-emerald-500">
                  Enterprise Type
                </Label>
                <Select value={profile.enterprise_type} onValueChange={(value) => handleProfileChange('enterprise_type', value)}>
                  <SelectTrigger className="rounded-xl border border-emerald-100 bg-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="trading">Trading</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="enterprise_size" className="text-sm font-semibold uppercase tracking-[0.26em] text-emerald-500">
                  Enterprise Size
                </Label>
                <Select value={profile.enterprise_size} onValueChange={(value) => handleProfileChange('enterprise_size', value)}>
                  <SelectTrigger className="rounded-xl border border-emerald-100 bg-white">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="micro">Micro (≤1 crore turnover)</SelectItem>
                    <SelectItem value="small">Small (≤10 crore turnover)</SelectItem>
                    <SelectItem value="medium">Medium (≤50 crore turnover)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="women_led"
                  checked={profile.women_led}
                  onChange={(e) => handleProfileChange('women_led', e.target.checked)}
                  className="rounded border-emerald-100"
                />
                <Label htmlFor="women_led" className="text-sm text-slate-700">Women-led enterprise</Label>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description" className="text-sm font-semibold uppercase tracking-[0.26em] text-emerald-500">
                  Additional Details
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your business, challenges, or specific needs..."
                  value={profile.description}
                  onChange={(e) => handleProfileChange('description', e.target.value)}
                  className="rounded-xl border border-emerald-100 bg-white resize-none"
                  rows={3}
                />
              </div>

              <Button
                onClick={handleRecommend}
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-6 py-5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5 hover:shadow-emerald-500/30"
              >
                {loading ? 'Finding Schemes...' : 'Get Recommendations'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}

          {schemes.length > 0 && (
            <Card className="rounded-3xl border border-emerald-100 bg-white/95 shadow-xl shadow-emerald-500/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
                  <Filter className="h-5 w-5" />
                  Filter Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="grid gap-2">
                    <Label className="text-sm font-semibold uppercase tracking-[0.26em] text-emerald-500">
                      Scheme Type
                    </Label>
                    <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
                      <SelectTrigger className="rounded-xl border border-emerald-100 bg-white">
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All types</SelectItem>
                        {schemeTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label className="text-sm font-semibold uppercase tracking-[0.26em] text-emerald-500">
                      Sector Focus
                    </Label>
                    <Select value={filters.sector} onValueChange={(value) => handleFilterChange('sector', value)}>
                      <SelectTrigger className="rounded-xl border border-emerald-100 bg-white">
                        <SelectValue placeholder="All sectors" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All sectors</SelectItem>
                        {sectors.map((sector) => (
                          <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label className="text-sm font-semibold uppercase tracking-[0.26em] text-emerald-500">
                      Search
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <Input
                        placeholder="Search schemes..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        className="pl-10 rounded-xl border border-emerald-100 bg-white"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {filteredSchemes.length === 0 && schemes.length === 0 && !loading && (
              <div className="flex h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/40 text-center">
                <TrendingUp className="mb-4 h-10 w-10 text-emerald-400" />
                <h3 className="text-lg font-semibold text-slate-900">No schemes found</h3>
                <p className="text-sm text-slate-500">Fill in your business profile to get personalized recommendations</p>
              </div>
            )}

            {filteredSchemes.map((scheme, index) => (
              <Card key={index} className="rounded-3xl border border-emerald-100 bg-white/95 shadow-xl shadow-emerald-500/10">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-slate-900">{scheme.Scheme_Name}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                          {scheme.Type}
                        </Badge>
                        {scheme.similarity && (
                          <Badge variant="outline" className="text-slate-600">
                            Similarity: {(scheme.similarity * 100).toFixed(1)}%
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild className="ml-4">
                      <a href={scheme.Official_Link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 mb-3">{scheme.Description}</p>
                  <div className="text-xs text-slate-500">
                    <strong>Eligibility:</strong> {scheme.Who_Can_Apply}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSchemes.length > 0 && (
            <div className="text-center text-sm text-slate-500">
              Showing {filteredSchemes.length} of {schemes.length} schemes
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
