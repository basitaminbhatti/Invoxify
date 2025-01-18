"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle,
  DownloadCloudIcon,
  Mail,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface iAppProps {
  id: string;
  status: string;
}

export function InvoiceActions({ id, status }: iAppProps) {
  const handleSendReminder = () => {
    toast.promise(
      fetch(`/api/email/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      {
        loading: "Sending reminder email...",
        success: "Reminder email sent successfully",
        error: "Failed to send reminder email",
      }
    );
  };
  // const handleDeleteInvoice = () => {
  //   toast.promise(
  //     fetch(`/api/invoice/${id}/delete`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }),
  //     {
  //       loading: "Deleting invoice...",
  //       success: "Invoice deleted successfully",
  //       error: "Failed to delete invoice",
  //     }
  //   );
  // };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* ============ ITEM ONE EDIT INVOICE ============ */}
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/invoices/${id}`} className="cursor-pointer">
            <Pencil className="size-4 mr-2" /> Edit Invoice
          </Link>
        </DropdownMenuItem>
        {/* ============ ITEM TWO DOWNLOAD INVOICE ============ */}
        <DropdownMenuItem asChild>
          <Link
            href={`/api/invoice/${id}`}
            target="_blank"
            className="cursor-pointer"
          >
            <DownloadCloudIcon className="size-4 mr-2" /> Download Invoice
          </Link>
        </DropdownMenuItem>
        {/* ============ ITEM THREE REMINDER EMAIL ============ */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="cursor-pointer"
            >
              <Mail className="size-4 mr-2" /> Reminder Email
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Send Invoice Reminder?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to send a reminder for this invoice? This
                will notify the recipient about their pending payment.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleSendReminder}>
                Send Reminder
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* ============ ITEM FOUR DELETE INVOICE ============ */}
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/invoices/${id}/delete`}>
            <Trash className="size-4 mr-2" /> Delete Invoice
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem onClick={handleDeleteInvoice}>
          <Trash className="size-4 mr-2" /> Delete Invoice 2
        </DropdownMenuItem> */}
        {/* ============ ITEM FIVE MARK AS PAID ============ */}
        {status !== "PAID" && (
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/invoices/${id}/paid`}>
              <CheckCircle className="size-4 mr-2" /> Mark as Paid
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
