import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  if (user) {
    // Check if the user already exists in the database
    const loggedInUser = await prisma.user.findUnique({
      where: { clerkUserId: user.id },
    });

    // Create the user in the database if they don't exist
    if (!loggedInUser) {
      await prisma.user.create({
        data: {
          name: user.fullName ?? "", // Use fullName, fallback to empty
          clerkUserId: user.id,
          email: user.emailAddresses[0].emailAddress,
          imageUrl: user.imageUrl,
        },
      });
    }
  }

  return <div>{children}</div>;
};

export default layout;
