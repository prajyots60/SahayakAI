import Link from "next/link";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Link
              href="/"
              className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-600"
            >
              SahayakAI
            </Link>
            <p className="max-w-xs text-sm text-slate-600">
              The financial co-pilot helping Indian MSMEs forecast risks,
              protect cash flow, and grow with confidence.
            </p>
            <p className="text-xs text-slate-400">
              Designed and built in India 🇮🇳
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, items]) => (
            <div key={title} className="space-y-3">
              <p className="text-sm font-semibold text-slate-900">{title}</p>
              <ul className="space-y-2 text-sm text-slate-600">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="transition hover:text-emerald-700"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-emerald-100 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} SahayakAI. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="mailto:team@sahayakai.in"
              className="transition hover:text-emerald-700"
            >
              team@sahayakai.in
            </Link>
            <span className="hidden h-1 w-1 rounded-full bg-emerald-300 sm:block" />
            <span>GST ready • Secure • Built for MSMEs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
