import React from 'react'
import Dashboard from '@/components/dashboard/dashboard';
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

const DashboardPage = async () => {
  
    const user = await currentUser();
  if (!user) return redirect("/");

  const dbUser = await prisma.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (dbUser?.role !== "admin") {
    return redirect("/");
  }

  return (
  <div>
    <Dashboard/>
  </div>
  )
}

export default DashboardPage;