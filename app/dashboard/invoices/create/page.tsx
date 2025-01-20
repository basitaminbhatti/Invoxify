import CreateInvoice from "@/app/components/CreateInvoice";
import InvoiceFallBack from "@/app/components/InvoiceFallback";
import { Suspense } from "react";

export default function InvoiceCreateRoute() {
  return (
    <Suspense fallback={<InvoiceFallBack />}>
      <CreateInvoice />
    </Suspense>
  );
}
