"use client";

import { InvoiceActions } from "@/app/components/InvoiceActions";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./DataTableColumnHeader";

export type Invoice = {
  id: string;
  total: number;
  status: "PENDING" | "DRAFT" | "PAID";
  clientName: string;
  clientEmail: string;
  currency: string;
  invoiceNumber: number;
  createdAt: Date;
};
export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "invoiceNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Invoice ID" />
    ),
  },
  {
    accessorKey: "clientName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Customer" />
    ),
  },
  {
    accessorKey: "clientEmail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));
      const currency = row.original.currency;
      const formatted = formatCurrency({
        amount: amount,
        currency: currency as any,
      });

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        className="text-center ml-3"
      />
    ),
    cell: ({ row }) => {
      const Status = row.original.status;

      return (
        <div className="text-center">
          <Badge
            variant={
              Status === "PAID"
                ? "default"
                : Status === "PENDING"
                ? "secondary"
                : "outline"
            }
          >
            {Status}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created at" />
    ),
    cell: ({ row }) => {
      const formatted = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(row.original.createdAt);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <InvoiceActions status={row.original.status} id={row.original.id} />
        </div>
      );
    },
  },
];
