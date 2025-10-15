import {
  Bot,
  CalendarCheck2,
  LayoutDashboard,
  LineChart,
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
        label: "Receivables",
        href: "/receivables",
        icon: LineChart,
        description: "Client risk heatmap",
      },
      {
        label: "Compliance",
        href: "/dashboard#compliance",
        icon: CalendarCheck2,
        description: "Deadlines & filings",
      },
    ],
  },
  {
    title: "Growth",
    items: [
      {
        label: "Investor Connect",
        href: "/dashboard#investor-connect",
        icon: Sparkles,
        status: "beta",
      },
    ],
  },
];
