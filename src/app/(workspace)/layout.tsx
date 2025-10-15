import type { ReactNode } from "react";

import Sidebar from "@/components/dashboard/Sidebar";

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="flex w-full flex-col gap-5 px-3 pb-12 pt-10 lg:flex-row lg:items-start lg:gap-7 lg:px-6 xl:px-8">
        <Sidebar className="lg:pl-1 xl:pl-2" />
        <main className="flex min-w-0 flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}
