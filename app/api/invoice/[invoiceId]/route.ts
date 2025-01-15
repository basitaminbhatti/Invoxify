import prisma from "@/app/utils/db";
import { NextResponse } from "next/server";
import jsPDF from "jspdf";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { invoxifyFooterPDF, invoxifyLogo } from "@/app/utils/imageBase64";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  // =========== GET INVOICE PARAM ===========
  const { invoiceId } = await params;

  // =========== GET INVOICE DATA ===========
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
    },
    select: {
      invoiceName: true,
      invoiceNumber: true,
      currency: true,
      fromName: true,
      fromEmail: true,
      fromAddress: true,
      clientName: true,
      clientAddress: true,
      clientEmail: true,
      date: true,
      dueDate: true,
      invoiceItemDescription: true,
      invoiceItemQuantity: true,
      invoiceItemRate: true,
      total: true,
      note: true,
    },
  });

  // =========== CHECK IF INVOICE DATA EXISTS ===========
  if (!data) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  // =========== CREATE PDF ===========
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const invoiceDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(new Date(data.date));

  // =========== SET PDF FONT ===========
  pdf.setFont("helvetica");
  pdf.setProperties({
    title: `Invoxify - ${data.invoiceName}`,
    creator: "Invoxify",
  });

  // =========== ADD HEADER ===========
  pdf.addImage(invoxifyLogo, "JPEG", 10, 0, 80, 80);
  pdf.setFontSize(12);
  pdf.setFont("courier");
  pdf.text(`Invoice Number: # ${data.invoiceNumber}`, 130, 40);

  // =========== Invoice Heading ===========
  pdf.setFontSize(60);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(55, 54, 67);
  pdf.text("INVOICE", 14, 70);

  // =========== Invoice Date ===========
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(0, 184, 107);
  pdf.text("Date:", 14, 85);

  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(29, 29, 29);
  pdf.text(invoiceDate, 26, 85);

  // =========== CLIENT SECTION ===========
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(0, 184, 107);
  pdf.text("Billed to:", 14, 100);

  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(29, 29, 29);
  pdf.text([data.fromName, data.fromEmail, data.fromAddress], 14, 105);

  // =========== FROM SECTION ===========
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(0, 184, 107);
  pdf.text("From:", 130, 100);

  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(29, 29, 29);
  pdf.text([data.clientName, data.clientEmail, data.clientAddress], 130, 105);

  // =========== INVOICE ITEMS SECTION HEADER ===========
  pdf.setDrawColor(0);
  pdf.setFillColor(169, 250, 216);
  pdf.rect(14, 130, 180, 11, "F");

  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text("Description", 20, 137);
  pdf.text("Quantity", 90, 137);
  pdf.text("Rate", 130, 137);
  pdf.text("Total", 165, 137);

  // =========== INVOICE ITEMS DATA ===========
  pdf.text(data.invoiceItemDescription, 20, 152);
  pdf.text(data.invoiceItemQuantity.toString(), 100, 152);
  pdf.text(data.invoiceItemRate.toString(), 130, 152);
  pdf.text(data.total.toString(), 165, 152);

  // =========== DRAW LINE ===========
  pdf.setLineWidth(0.5);
  pdf.setDrawColor(230, 230, 232);
  pdf.line(14, 160, 195, 160);

  // =========== Total ===========
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(0, 184, 107);
  pdf.text("TOTAL", 130, 170);
  pdf.text(
    formatCurrency({
      amount: data.total,
      currency: data.currency as any,
    }),
    165,
    170
  );

  // =========== DRAW LINE ===========
  pdf.line(14, 175, 195, 175);

  // =========== NOTE SECTION ===========
  if (data.note) {
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(29, 29, 29);
    pdf.text("Note:", 14, 190);

    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(29, 29, 29);
    pdf.text(data.note, 26, 190);
  }

  // =========== FOOTER ===========
  pdf.addImage(invoxifyFooterPDF, "JPEG", 0, 238, 210, 60);

  // ===========  GENERATE PDF AS BUFFER ===========
  const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));

  // ===========  RETURN PDF BUFFER ===========
  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
    },
  });
}
