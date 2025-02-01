import { buttonVariants } from "@/components/ui/button";
import { FilePlus2, PlusIcon } from "lucide-react";
import Link from "next/link";

export default function EmptyStates() {
  return (
    <div className="flex flex-1 justify-center items-center text-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="mb-6">
          <FilePlus2 className="mx-auto text-gray-400 size-28" />
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            No Invoices Yet? Let's Get Started!
          </h2>
          <p className="text-gray-600">
            Start by adding your first invoice and simplify your billing process
            today. With Invoxify
          </p>
        </div>
        <Link href="/dashboard/invoices/create" className={buttonVariants()}>
          <PlusIcon /> Create Invoice
        </Link>
      </div>
    </div>
  );
}
