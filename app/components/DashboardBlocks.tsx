import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, Users2Icon, Wallet } from "lucide-react";
import prisma from "../utils/db";
import { RequireUser } from "../utils/hooks";
import { formatCurrency } from "../utils/formatCurrency";
import NumberTicker from "@/components/ui/number-ticker";

export async function DashboardBlocks() {
  const session = await RequireUser();
  const { data, pendingInvoices, paidinvoices } = await getData(
    session.user?.id as string
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
      {/* ========================== First Block ========================== */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <Wallet className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">
            {formatCurrency({
              amount: data.reduce((acc, invoice) => acc + invoice.total, 0),
              currency: "USD",
            })}
          </h2>
          <p className="text-xs text-muted-foreground">Revenue Earned</p>
        </CardContent>
      </Card>
      {/* ========================== Second Block ========================== */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Invoices Issued
          </CardTitle>
          <Users2Icon className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">
            +<NumberTicker value={data.length} />
          </h2>
          <p className="text-xs text-muted-foreground">Invoices Issued</p>
        </CardContent>
      </Card>
      {/* ========================== Third Block ========================== */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
          <CreditCard className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">
            +<NumberTicker value={paidinvoices.length} />
          </h2>
          <p className="text-xs text-muted-foreground">Paid Invoices </p>
        </CardContent>
      </Card>
      {/* ========================== Fourth Block ========================== */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Invoices
          </CardTitle>
          <Activity className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-bold">
            +<NumberTicker value={pendingInvoices.length} />
          </h2>
          <p className="text-xs text-muted-foreground">Pending Invoices </p>
        </CardContent>
      </Card>
    </div>
  );
}

async function getData(userId: string) {
  const [data, pendingInvoices, paidinvoices] = await Promise.all([
    prisma.invoice.findMany({
      where: {
        userId: userId,
      },
      select: {
        total: true,
      },
    }),
    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: "PENDING",
      },
      select: {
        id: true,
      },
    }),

    prisma.invoice.findMany({
      where: {
        userId: userId,
        status: "PAID",
      },
      select: {
        id: true,
      },
    }),
  ]);

  return {
    data,
    pendingInvoices,
    paidinvoices,
  };
}
