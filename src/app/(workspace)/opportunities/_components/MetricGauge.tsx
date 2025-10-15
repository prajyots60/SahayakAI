import { buildGaugeColor, formatScoreLabel } from "./utils";

type MetricGaugeProps = {
  label: string;
  score: number;
  description: string;
  labelFormatter?: (score: number) => string;
};

export function MetricGauge({
  label,
  score,
  description,
  labelFormatter,
}: MetricGaugeProps) {
  const boundedScore = Math.max(0, Math.min(100, score));
  const { primary } = buildGaugeColor(boundedScore);
  const labelText = labelFormatter
    ? labelFormatter(boundedScore)
    : formatScoreLabel(boundedScore);

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-500">
        {label}
      </p>
      <div className="mt-3 flex items-center gap-4">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full bg-slate-100" />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(${primary} ${
                (boundedScore / 100) * 360
              }deg, rgba(148,163,184,0.16) ${(boundedScore / 100) * 360}deg)`,
            }}
          />
          <div className="absolute inset-[22%] rounded-full bg-white" />
          <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-slate-900">
            {Math.round(boundedScore)}
          </span>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-slate-900">{labelText}</p>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </div>
    </div>
  );
}
