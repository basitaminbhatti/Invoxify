"use server"

import { redirect } from "next/navigation";
import { onboardingSchema } from "./utils/zodSchemas";
import prisma from "./utils/db";
import { RequireUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod";


// ================== Onboarding User =====================
export async function onboardUser(prevState:any,formData:FormData) {
    const session = await RequireUser();

    const submission = parseWithZod(formData, {
        schema: onboardingSchema,
      });

      if (submission.status !== "success") {
        return submission.reply();
      }

      const data = await prisma.user.update({
        where: {
          id: session.user?.id,
        },
        data: {
          firstName: submission.value.firstName,
          lastName: submission.value.lastName,
          address: submission.value.address,
        },
      });
      return redirect("/dashboard");
}