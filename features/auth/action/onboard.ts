"use server"

import { currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/db"
import type { User } from "@/lib/generated/prisma/client"

export async function onboard() {
    const clerkUser = await currentUser()

    if (!clerkUser) return { success: false, error: "Unauthorized" }

    const email = clerkUser.emailAddresses[0].emailAddress ?? null
  
    return prisma.user.upsert({
        where: { clerkId: clerkUser.id },
        update: {
            email,
            firstName: clerkUser.firstName,
            lastName: clerkUser.lastName,
            imageUrl: clerkUser.imageUrl
        },
        create: {
            clerkId: clerkUser.id,
            email,
            firstName: clerkUser.firstName,
            lastName: clerkUser.lastName,
            imageUrl: clerkUser.imageUrl
        }
    })
}