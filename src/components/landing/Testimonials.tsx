"use client";

import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Owner, Sharma Textiles",
    location: "Jaipur, Rajasthan",
    quote:
      "SahayakAI alerted me to a looming cash flow issue, giving me enough time to secure a MUDRA loan. It's a lifesaver!",
  },
  {
    name: "Rajesh Kumar",
    role: "Founder, Kumar Electronics",
    location: "Coimbatore, Tamil Nadu",
    quote:
      "Our team uses the weekly risk score in every review. We caught a falling sales trend two weeks earlier than usual and saved the quarter.",
  },
  {
    name: "Anjali Desai",
    role: "Director, Desai Handicrafts",
    location: "Ahmedabad, Gujarat",
    quote:
      "The AI advisor speaks the language of Indian MSMEs. It even suggested schemes I qualified for and gave a step-by-step execution plan.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#f0f5f1] py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-emerald-600">
            Voices from the community
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Built with founders, trusted by founders
          </h2>
          <p className="mt-4 text-base text-slate-600">
            We co-created SahayakAI with business owners across India. Here’s
            how they stay ahead.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="flex h-full flex-col gap-6 rounded-3xl border border-emerald-100 bg-white/95 p-6 text-left shadow-lg shadow-emerald-500/5"
            >
              <Quote className="h-6 w-6 text-emerald-500" />
              <p className="text-sm leading-6 text-slate-700">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-auto">
                <p className="text-sm font-semibold text-slate-900">
                  {testimonial.name}
                </p>
                <p className="text-xs text-slate-500">{testimonial.role}</p>
                <p className="text-xs text-slate-400">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 rounded-3xl border border-emerald-100 bg-white/95 p-8 text-sm text-slate-600 shadow-lg shadow-emerald-500/5 sm:grid-cols-3">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="text-2xl font-semibold text-emerald-700">
              10,000+
            </span>
            <span>Reports generated for MSMEs</span>
          </div>
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="text-2xl font-semibold text-emerald-700">
              4.9 / 5
            </span>
            <span>Average rating from business owners</span>
          </div>
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="text-2xl font-semibold text-emerald-700">
              ₹50 Cr+
            </span>
            <span>Risks mitigated and loans optimised</span>
          </div>
        </div>
      </div>
    </section>
  );
}
