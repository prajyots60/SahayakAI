export type ScoreTone = "high" | "medium" | "neutral";

export function resolveScoreTone(score: number): ScoreTone {
  if (score >= 80) return "high";
  if (score >= 60) return "medium";
  return "neutral";
}

export function formatScoreLabel(score: number): string {
  const tone = resolveScoreTone(score);
  if (tone === "high") return "High";
  if (tone === "medium") return "Moderate";
  return "Saturated / Limited";
}

export function buildGaugeColor(score: number): {
  primary: string;
  glow: string;
} {
  const tone = resolveScoreTone(score);
  if (tone === "high") {
    return { primary: "#10b981", glow: "rgba(16, 185, 129, 0.25)" };
  }
  if (tone === "medium") {
    return { primary: "#f59e0b", glow: "rgba(245, 158, 11, 0.18)" };
  }
  return { primary: "#94a3b8", glow: "rgba(148, 163, 184, 0.16)" };
}
