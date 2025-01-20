import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "../utils/db";
import { RequireUser } from "../utils/hooks";
import { formatCurrency } from "../utils/formatCurrency";
import { AnimatedList } from "@/components/ui/animated-list";
async function getData(userId: string) {
  const data = await prisma.invoice.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      clientName: true,
      clientEmail: true,
      total: true,
      currency: true,
    },
    orderBy: {
      createdAt: "asc",
    },
    take: 7,
  });

  return data;
}

function formatEmail(email: string) {
  const [username, domain] = email.split("@");
  const hiddenPart =
    username.length > 2 ? username.slice(0, 2) + "***" : username + "***";
  return `${hiddenPart}@${domain}`;
}

export async function RecentInvoices() {
  const session = await RequireUser();
  const data = await getData(session.user?.id as string);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8">
        <AnimatedList>
          {data.map((item) => (
            <div className="flex items-center gap-4" key={item.id}>
              <Avatar className="hidden sm:flex size-9">
                <AvatarFallback>
                  {item.clientName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium leadin-none">
                  {item.clientName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatEmail(item.clientEmail)}
                </p>
              </div>
              <div className="ml-auto font-medium text-sm">
                +
                {formatCurrency({
                  amount: item.total,
                  currency: item.currency as any,
                })}
              </div>
            </div>
          ))}
        </AnimatedList>
      </CardContent>
    </Card>
  );
}
