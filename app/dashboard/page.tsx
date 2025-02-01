import { Suspense } from "react";
import { DashboardBlocks } from "../components/DashboardBlocks";
import { InvoiceGraph } from "../components/InvoiceGraph";
import { RecentInvoices } from "../components/RecentInvoices";
import { RequireUser } from "../utils/hooks";
import { Metadata } from "next";
import DashboardFallBack from "../components/DashbooardFallBack";
import EmptyStatesInvoice from "../components/EmptyStatesInvoice";
import prisma from "../utils/db";

export const metadata: Metadata = {
  title: "Dashboard",
};
async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
    },
  });

  return data;
}
export default async function DashboardPage() {
  const session = await RequireUser();
  const data = await getData(session.user?.id as string);
  if (data.length === 0) {
    return <EmptyStatesInvoice />;
  }
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
