import { DashboardBlocks } from "../components/DashboardBlocks";
import { InvoiceGraph } from "../components/InvoiceGraph";
import { RecentInvoices } from "../components/RecentInvoices";
import { RequireUser } from "../utils/hooks";

export default async function DashboardPage() {
  const session = await RequireUser();
  return (
    <>
      <DashboardBlocks />
      <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
        <div className="lg:col-span-2">
          <InvoiceGraph />
        </div>
        <RecentInvoices />
      </div>
    </>
  );
}
