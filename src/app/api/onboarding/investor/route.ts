import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      errors: [
        {
          path: "general",
          message:
            "Investor onboarding endpoint is pending schema support. Please implement an InvestorProfile model first.",
        },
      ],
    },
    { status: 501 }
  );
}
