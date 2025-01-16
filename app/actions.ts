"use server";

import { redirect } from "next/navigation";
import { invoiceSchema, onboardingSchema } from "./utils/zodSchemas";
import prisma from "./utils/db";
import { RequireUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod";
import { emailClient } from "./utils/mailtrap";
import { formatCurrency } from "./utils/formatCurrency";

// ================== Onboarding User =====================
export async function onboardUser(prevState: any, formData: FormData) {
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

  // EMAIL SENDING
  const sender = {
    email: "hello@demomailtrap.com",
    name: "Abdul Basit",
  };

  const recipients = [
    {
      email: "basitaminbhatti@gmail.com",
    },
  ];

  const invoicedueDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(new Date(submission.value.date));

  const invoicetotalAmount = formatCurrency({
    amount: submission.value.total,
    currency: submission.value.currency as any,
  });

  emailClient.send({
    from: sender,
    to: recipients,
    template_uuid: "25d47ecd-845a-40a7-8e06-8179e48e0058",
    template_variables: {
      clientName: submission.value.clientName,
      invoiceNumber: submission.value.invoiceNumber,
      dueDate: invoicedueDate,
      totalAmount: invoicetotalAmount,
      invoiceLink: `http://localhost:3000/api/invoice/${data.id}`,
    },
  });

  return redirect("/dashboard/invoices");
}

// ================== Update Invoice =====================
export async function editInvoice(prevState: any, formData: FormData) {
  const session = await RequireUser();

  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.invoice.update({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id,
    },
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      fromAddress: submission.value.fromAddress,
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
    },
  });
  return redirect("/dashboard/invoices");
}
