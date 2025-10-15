import { formatScoreLabel, buildGaugeColor } from "./utils";

type OpportunityGaugeProps = {
  score: number;
};

export function OpportunityGauge({ score }: OpportunityGaugeProps) {
  const boundedScore = Math.max(0, Math.min(100, score));
  const { primary, glow } = buildGaugeColor(boundedScore);

  return (
    <div className="relative flex h-full flex-1 items-center justify-center">
      <div className="relative flex size-48 items-center justify-center">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(${primary} ${
              (boundedScore / 100) * 360
            }deg, rgba(148,163,184,0.18) ${(boundedScore / 100) * 360}deg)`,
            boxShadow: `0 24px 50px -30px ${glow}`,
          }}
        />
        <div className="absolute inset-[16%] rounded-full border border-emerald-100 bg-white/95 shadow-inner" />
        <div className="absolute inset-[29%] rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 opacity-20 blur-3xl" />
        <div className="relative flex flex-col items-center justify-center rounded-full bg-white/95 px-6 py-5 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-500">
            Opportunity score
          </span>
          <span className="mt-2 text-4xl font-semibold text-slate-900">
            {boundedScore}
            <span className="text-lg text-slate-400">/100</span>
          </span>
          <span className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-500">
            {formatScoreLabel(boundedScore)} market
          </span>
        </div>
      </div>
    </div>
  );
}
