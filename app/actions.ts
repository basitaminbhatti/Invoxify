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

// ================== Create Invoice with Email =====================
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
    email: "no-reply@invoxify.tech",
    name: "Invoxify",
  };

  const recipients = [
    {
      email: submission.value.clientEmail,
    },
  ];

  const invoiceDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(new Date(submission.value.date));

  const invoicetotalAmount = formatCurrency({
    amount: submission.value.total,
    currency: submission.value.currency as any,
  });

  emailClient.send({
    from: sender,
    to: recipients,
    template_uuid: "b019737b-1091-4f5f-9341-cee4ec297ea3",
    template_variables: {
      first_name: submission.value.clientName,
      InvoiceNumber: submission.value.invoiceNumber,
      InvoiceDate: invoiceDate,
      InvoiceAmount: invoicetotalAmount,
      InvoiceLink: `https://www.invoxify.tech/api/invoice/${data.id}`,
      FromEmail: submission.value.fromEmail,
      FromName: submission.value.fromName,
      Year: new Date().getFullYear().toString(),
    },
  });

  return redirect("/dashboard/invoices");
}

// ================== Draft Invoice =====================
export async function draftInvoice(prevState: any, formData: FormData) {
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
      status: "DRAFT",
      total: submission.value.total,
      note: submission.value.note,
      userId: session.user?.id,
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
// ================== Update Draft Invoice =====================
export async function editDraftInvoice(prevState: any, formData: FormData) {
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
      status: "DRAFT",
      total: submission.value.total,
      note: submission.value.note,
    },
  });
  return redirect("/dashboard/invoices");
}

// ================== Update Client Invoice with Email =====================
export async function editClientInvoice(prevState: any, formData: FormData) {
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
      status: "PENDING",
      total: submission.value.total,
      note: submission.value.note,
    },
  });
  return redirect("/dashboard/invoices");
}

// ================== Delete Invoice =====================
export async function DeleteInvoice(invoiceId: string) {
  const session = await RequireUser();

  const data = await prisma.invoice.delete({
    where: {
      userId: session.user?.id,
      id: invoiceId,
    },
  });

  return redirect("/dashboard/invoices");
}

// ================== Mark As Paid =====================
export async function MarkAsPaidAction(invoiceId: string) {
  const session = await RequireUser();

  const data = await prisma.invoice.update({
    where: {
      userId: session.user?.id,
      id: invoiceId,
    },
    data: {
      status: "PAID",
    },
  });

  return redirect("/dashboard/invoices");
}
// ================== handleInvoiceActions =====================
export async function handleInvoiceActions(prevState: any, formData: FormData) {
  const actionType = formData.get("action") as string | null;
  if (!actionType) {
    throw new Error("Action type is required.");
  }
  if (actionType === "draftInvoice") {
    return draftInvoice(prevState, formData);
  } else if (actionType === "createInvoice") {
    return createInvoice(prevState, formData);
  } else if (actionType === "editDraftInvoice") {
    return editDraftInvoice(prevState, formData);
  } else if (actionType === "editClientInvoice") {
    return editClientInvoice(prevState, formData);
  } else if (actionType === "editInvoice") {
    return editInvoice(prevState, formData);
  } else {
    throw new Error("Invalid action type");
  }
}
