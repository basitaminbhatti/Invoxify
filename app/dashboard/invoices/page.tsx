import { Suspense } from "react";
import InvoiceListFallBack from "@/app/components/InvoiceListFallback";
import DataTableMain from "@/app/components/DataTableMain";

export default async function Invoices() {
  return (
    <Suspense fallback={<InvoiceListFallBack />}>
      <DataTableMain />
    </Suspense>
  );
}
