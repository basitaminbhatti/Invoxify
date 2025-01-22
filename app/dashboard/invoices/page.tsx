import { Suspense } from "react";
import InvoiceListFallBack from "@/app/components/InvoiceListFallback";
import DataTableMain from "@/app/components/DataTableMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoices",
};
export default async function Invoices() {
  return (
    <Suspense fallback={<InvoiceListFallBack />}>
      <DataTableMain />
    </Suspense>
  );
}
