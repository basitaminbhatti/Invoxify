import { AnimatedList } from "@/components/ui/animated-list";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity, CreditCard, Users2Icon, Wallet } from "lucide-react";
export default function DashboardFallBack() {
  return (
    <>
      {/* ========================== DashboardBlocks ========================== */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8">
        {/* ========================== First Block ========================== */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Wallet className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-bold">$0</h2>
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
            <h2 className="text-2xl font-bold">+0</h2>
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
            <h2 className="text-2xl font-bold">+0</h2>
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
            <h2 className="text-2xl font-bold">+0</h2>
            <p className="text-xs text-muted-foreground">Pending Invoices </p>
          </CardContent>
        </Card>
      </div>
      {/* ========================== DashboardBlocks ENDS ========================== */}
      <div className="grid gap-4 lg:grid-cols-3 md:gap-6">
        {/* ========================== GRAPH ========================== */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Paid Invoices</CardTitle>
              <CardDescription>
                Invoices which have been paid in the last 30 days.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[370px]">
              <Skeleton className="w-full h-full" />
            </CardContent>
          </Card>
        </div>
        {/* ========================== RecentInvoices ========================== */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <AnimatedList>
              {Array(7)
                .fill(null)
                .map((_, index) => (
                  <div className="flex items-center gap-4" key={index}>
                    <Avatar className="hidden sm:flex size-9">
                      <AvatarFallback></AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-4 w-[90px]" />
                      <Skeleton className="h-3 w-[140px]" />
                    </div>
                    <div className="ml-auto">
                      <Skeleton className="h-5 w-[40px]" />
                    </div>
                  </div>
                ))}
            </AnimatedList>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
