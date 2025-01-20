import EditInvoice from "@/app/components/EditInvoice";
import InvoiceFallBack from "@/app/components/InvoiceFallback";
import prisma from "@/app/utils/db";
import { RequireUser } from "@/app/utils/hooks";
import { notFound } from "next/navigation";
import { Suspense } from "react";

async function getData(invoiceId: string, userId: string) {
  const data = await prisma.invoice.findUnique({
    where: {
      id: invoiceId,
      userId: userId,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

type Params = Promise<{ invoiceId: string }>;

export default async function EditInvoiceRoute({ params }: { params: Params }) {
  const { invoiceId } = await params;
  const session = await RequireUser();
  const data = await getData(invoiceId, session.user?.id as string);

  return (
    <Suspense fallback={<InvoiceFallBack />}>
      <EditInvoice data={data} />
    </Suspense>
  );
}
