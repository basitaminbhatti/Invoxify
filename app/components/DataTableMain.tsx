import prisma from "@/app/utils/db";
import { RequireUser } from "@/app/utils/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable } from "@/app/components/data-table";
import { columns } from "@/app/components/columns";
import InvoiceHeader from "./InvoiceHeader";

export default async function DataTableMain() {
  const session = await RequireUser();
  const data = await getData(session.user?.id as string);
  return (
    <>
      <Card>
        <InvoiceHeader />
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </>
  );
}

async function getData(userId: string) {
  // await new Promise((resolve) => setTimeout(resolve, 4000));
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      clientName: true,
      clientEmail: true,
      total: true,
      createdAt: true,
      status: true,
      invoiceNumber: true,
      currency: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}
