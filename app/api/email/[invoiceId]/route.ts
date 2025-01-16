import prisma from "@/app/utils/db";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { RequireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  try {
    const session = await RequireUser();

    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

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
    }).format(new Date(invoiceData.dueDate));

    const invoiceDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(new Date(invoiceData.date));

    const invoicetotalAmount = formatCurrency({
      amount: invoiceData.total,
      currency: invoiceData.currency as any,
    });

    emailClient.send({
      from: sender,
      to: recipients,
      template_uuid: "e1853471-9a76-4c1d-8b5f-331fdf13b139",
      template_variables: {
        first_name: invoiceData.clientName,
        InvoiceNumber: invoiceData.invoiceNumber,
        InvoiceDate: invoiceDate,
        InvoiceAmount: invoicetotalAmount,
        DueDate: invoicedueDate,
        InvoiceLink: `http://localhost:3000/api/invoice/${invoiceData.id}`,
        FromName: invoiceData.fromName,
        Year: new Date().getFullYear().toString(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send Email reminder" },
      { status: 500 }
    );
  }
}
