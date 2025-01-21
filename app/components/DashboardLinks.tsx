"use client";
import {
  ChartNoAxesColumnIncreasing,
  Contact,
  HomeIcon,
  Info,
  ListTodo,
  MessageSquareText,
  Settings,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

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
  {
    id: 2,
    name: "Contacts",
    href: "#",
    icon: Contact,
  },
  {
    id: 3,
    name: "Todos",
    href: "#",
    icon: ListTodo,
  },
  {
    id: 4,
    name: "Messages",
    href: "#",
    icon: MessageSquareText,
  },
  {
    id: 5,
    name: "Reports",
    href: "#",
    icon: ChartNoAxesColumnIncreasing,
  },
  {
    id: 6,
    name: "Settings",
    href: "#",
    icon: Settings,
  },
  {
    id: 7,
    name: "Support Center",
    href: "#",
    icon: Info,
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
              ? "text-primary bg-green-600/10"
              : "text-muted-foreground hover:text-foreground",
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
          )}
          onClick={
            links.href === "#"
              ? () => toast.info("This feature is coming your way soon!")
              : undefined
          }
        >
          <links.icon className="size-4" />
          {links.name}
        </Link>
      ))}
    </>
  );
}
