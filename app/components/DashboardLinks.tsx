"use client";
import { HomeIcon, Users2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const dashboardLinks = [
  {
    id: 0,
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    id: 1,
    name: "Invoices",
    href: "/dashboard/invoices",
    icon: Users2,
  },
];
export function DashboardLinks() {
  const pathname = usePathname();
  return (
    <>
      {dashboardLinks.map((links) => (
        <Link
          key={links.id}
          href={links.href}
          className={cn(
            pathname === links.href
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground",
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
          )}
        >
          <links.icon className="size-4" />
          {links.name}
        </Link>
      ))}
    </>
  );
}
