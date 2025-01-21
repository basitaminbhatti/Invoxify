import { InvoiceList } from "@/app/components/InvoiceList";
import { InvoiceListFallBack } from "@/app/components/InvoiceListFallback";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoices",
};

export default async function invoices() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Invoices</CardTitle>
            <CardDescription>Manage your invoices right here</CardDescription>
          </div>
          <Link href="/dashboard/invoices/create" className={buttonVariants()}>
            <PlusIcon /> Create Invoice
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<InvoiceListFallBack />}>
          <InvoiceList />
        </Suspense>
      </CardContent>
    </Card>
  );
}
