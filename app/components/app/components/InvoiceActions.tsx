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

export function InvoiceActions() {
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
          <Link href="/">
            <Pencil className="size-4 mr-2" /> Edit Invoice
          </Link>
        </DropdownMenuItem>
        {/* ============ ITEM TWO DOWNLOAD INVOICE ============ */}
        <DropdownMenuItem asChild>
          <Link href="/">
            <DownloadCloudIcon className="size-4 mr-2" /> Download Invoice
          </Link>
        </DropdownMenuItem>
        {/* ============ ITEM THREE REMINDER EMAIL ============ */}
        <DropdownMenuItem asChild>
          <Link href="/">
            <Mail className="size-4 mr-2" /> Reminder Email
          </Link>
        </DropdownMenuItem>
        {/* ============ ITEM FOUR DELETE INVOICE ============ */}
        <DropdownMenuItem asChild>
          <Link href="/">
            <Trash className="size-4 mr-2" /> Delete Invoice
          </Link>
        </DropdownMenuItem>
        {/* ============ ITEM FIVE MARK AS PAID ============ */}
        <DropdownMenuItem asChild>
          <Link href="/">
            <CheckCircle className="size-4 mr-2" /> Mark as Paid
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
