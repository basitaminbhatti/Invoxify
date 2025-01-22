import { buttonVariants } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function InvoiceHeader() {
  return (
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
  );
}
