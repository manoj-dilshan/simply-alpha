import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await currentUser();
  if (!user) return NextResponse.json({ role: null });

  const dbUser = await prisma.user.findUnique({
    where: { clerkUserId: user.id },
    select: { role: true },
  });

  return NextResponse.json({ role: dbUser?.role || "user" });
}
