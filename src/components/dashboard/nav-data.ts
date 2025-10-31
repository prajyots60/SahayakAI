import {
  Bot,
  CalendarCheck2,
  LayoutDashboard,
  LineChart,
  MapPinned,
  ShieldCheck,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type DashboardNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
  status?: "new" | "beta";
};

export type DashboardNavSection = {
  title: string;
  items: DashboardNavItem[];
};

export const dashboardNavSections: DashboardNavSection[] = [
  {
    title: "Overview",
    items: [
      {
        label: "Today",
        href: "/dashboard",
        icon: LayoutDashboard,
        description: "Business pulse & trust score",
      },
      {
        label: "Trust Score",
        href: "/dashboard#trust-score",
        icon: ShieldCheck,
        description: "Signals shaping your grade",
      },
    ],
  },
  {
    title: "Operations",
    items: [
      {
        label: "Data Input",
        href: "/data-input",
        icon: UploadCloud,
        description: "Books, sales & bank feeds",
      },
      {
        label: "AI Advisor",
        href: "/advisor",
        icon: Bot,
        description: "24/7 MSME coach",
      },
      {
        label: "Govt Schemes",
        href: "/government-schemes",
        icon: ShieldCheck,
        description: "Find eligible schemes",
      },
      {
        label: "Receivables",
        href: "/receivables",
        icon: LineChart,
        description: "Client risk heatmap",
      },
      {
        label: "Compliance",
        href: "/compliance",
        icon: CalendarCheck2,
        description: "Deadlines & filings",
      },
    ],
  },
  {
    title: "Growth",
    items: [
      {
        label: "Market Expansion",
        href: "/opportunities",
        icon: MapPinned,
        description: "Find your next city",
        status: "new",
      },
      {
        label: "Investor Connect",
        href: "/investor-connect",
        icon: Sparkles,
        status: "beta",
      },
    ],
  },
];
