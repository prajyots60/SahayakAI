import { NextResponse } from "next/server";
import { prismaClient } from "@/lib/prismaClient";
import { z } from "zod";
import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const signupSchema = z
  .object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
        message: "Password must contain letters and numbers",
      }),
    role: z.nativeEnum(UserRole).default(UserRole.MSME_OWNER),
    businessName: z
      .string()
      .trim()
      .min(2, "Business name must be at least 2 characters")
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === UserRole.MSME_OWNER && !data.businessName?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Business name is required for MSME owners",
        path: ["businessName"],
      });
    }
  });

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = signupSchema.safeParse(json);
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

    const { fullName, email, password, role, businessName } = parsed.data;
    const normalizedEmail = email.toLowerCase();

    const exists = await prismaClient.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true },
    });
    if (exists) {
      return NextResponse.json(
        {
          success: false,
          errors: [{ path: "email", message: "Email already in use" }],
        },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prismaClient.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        fullName, // optional in schema, we still store the provided value
        role,
        businessProfile:
          role === UserRole.MSME_OWNER && businessName
            ? { create: { businessName } }
            : undefined,
      },
      select: { id: true, email: true, fullName: true, role: true },
    });

    return NextResponse.json({ success: true, user }, { status: 201 });
  } catch (err) {
    console.error("/api/signup error", err);
    return NextResponse.json(
      {
        success: false,
        errors: [
          { path: "general", message: "Unexpected error. Please try again." },
        ],
      },
      { status: 500 }
    );
  }
}
