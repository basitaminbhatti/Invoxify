import CreateInvoice from "@/app/components/CreateInvoice";
import InvoiceFallBack from "@/app/components/InvoiceFallback";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Invoice",
};

export default function InvoiceCreateRoute() {
  return (
    <Suspense fallback={<InvoiceFallBack />}>
      <CreateInvoice />
    </Suspense>
  );
}
