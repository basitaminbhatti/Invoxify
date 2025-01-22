import { Suspense } from "react";
import { DashboardBlocks } from "../components/DashboardBlocks";
import { InvoiceGraph } from "../components/InvoiceGraph";
import { RecentInvoices } from "../components/RecentInvoices";
import { RequireUser } from "../utils/hooks";
import { Metadata } from "next";
import DashboardFallBack from "../components/DashbooardFallBack";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await RequireUser();
  return (
    <Suspense fallback={<DashboardFallBack />}>
      <DashboardBlocks />
      <div className="grid gap-4 lg:grid-cols-3 md:gap-6">
        <div className="lg:col-span-2">
          <InvoiceGraph />
        </div>
        <RecentInvoices />
      </div>
    </Suspense>
  );
}
