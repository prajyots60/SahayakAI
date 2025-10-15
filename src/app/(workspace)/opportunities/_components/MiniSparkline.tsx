type MiniSparklineProps = {
  label: string;
  data: number[];
  description: string;
};

export function MiniSparkline({
  label,
  data,
  description,
}: MiniSparklineProps) {
  if (data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1 || 1)) * 100;
      const normalized = (value - min) / (max - min || 1);
      const y = 100 - normalized * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-emerald-500">
        {label}
      </p>
      <div className="mt-3">
        <svg viewBox="0 0 100 100" className="h-24 w-full">
          <defs>
            <linearGradient id="sparklineGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            points={points}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polygon
            points={`0,100 ${points} 100,100`}
            fill="url(#sparklineGradient)"
            opacity="0.4"
          />
        </svg>
      </div>
      <p className="mt-2 text-xs text-slate-500">{description}</p>
    </div>
  );
}
