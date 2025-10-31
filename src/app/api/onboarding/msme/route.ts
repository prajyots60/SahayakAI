import { NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "@/lib/prismaClient";

const msmeOnboardingSchema = z.object({
  userId: z.string().uuid(),
  industry: z.string().min(2).optional(),
  location: z.string().min(2).optional(),
  entityType: z.string().min(2).optional(),
  annualTurnoverRange: z.string().min(1).optional(),
  employeeCountRange: z.string().min(1).optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = msmeOnboardingSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          errors: parsed.error.issues.map((i) => ({
            path: i.path.join("."),
            message: i.message,
          })),
        },
        { status: 422 }
      );
    }

    const { userId, ...profile } = parsed.data;

    // Ensure user exists
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          errors: [{ path: "userId", message: "User not found" }],
        },
        { status: 404 }
      );
    }

    // Create or update business profile
    const bp = await prismaClient.businessProfile.upsert({
      where: { userId },
      update: { ...profile },
      create: {
        userId,
        businessName: "", // placeholder if somehow not created; must be set later if empty
        ...profile,
      },
    });

    return NextResponse.json(
      { success: true, businessProfile: bp },
      { status: 200 }
    );
  } catch (err) {
    console.error("/api/onboarding/msme error", err);
    return NextResponse.json(
      {
        success: false,
        errors: [
          { path: "general", message: "Unable to save onboarding. Try again." },
        ],
      },
      { status: 500 }
    );
  }
}
