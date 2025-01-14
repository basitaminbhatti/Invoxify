"use server"

import { redirect } from "next/navigation";
import { invoiceSchema, onboardingSchema } from "./utils/zodSchemas";
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

// ================== Create Invoice =====================
export async function createInvoice(prevState: any, formData: FormData) {
  const session = await RequireUser();

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.invoice.create({
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientNumber: submission.value.clientNumber,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
      fromNumber: submission.value.fromNumber,
      fromEmail: submission.value.fromEmail,
      fromName: submission.value.fromName,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note,
      userId: session.user?.id,
    },
});

return redirect("/dashboard/invoices");

}