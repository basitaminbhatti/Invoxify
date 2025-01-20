import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
export default function Checking() {
  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col gap-1 w-fit mb-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-5 w-[50px]" />
              <Skeleton className="h-9 w-[250px]" />
            </div>
          </div>
          {/* ++++++++++++++ INVOICE NUMBER / CURRENCY ++++++++++++++ */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* =========== INVOICE NUMBER =========== */}
            <div className="space-y-1">
              <Skeleton className="h-4 w-[50px]" />
              <Skeleton className="h-9 w-[250px]" />
            </div>
            {/* =========== Currency =========== */}
            <div className="space-y-1">
              <Skeleton className="h-4 w-[50px]" />
              <Skeleton className="h-9 w-[250px]" />
            </div>
          </div>
          {/* ++++++++++++++ USER / CLIENT ++++++++++++++ */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* =========== FROM =========== */}
            <div className="space-y-1">
              <Skeleton className="h-4 w-[50px]" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
            {/* =========== TO =========== */}
            <div className="space-y-1">
              <Skeleton className="h-4 w-[50px]" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
          {/* ++++++++++++++ DATE / DUE DATE ++++++++++++++ */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* =========== DATE =========== */}
            <div className="space-y-1">
              <Skeleton className="h-4 w-[50px]" />
              <Skeleton className="h-9 w-[250px]" />
            </div>
            <div className="space-y-1">
              <Skeleton className="h-4 w-[50px]" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
          {/* ++++++++++++++ CHART ++++++++++++++ */}
          <div>
            {/* ============= HEADINGS ============= */}
            <div className="grid grid-cols-12 gap-4 mb-2">
              <Skeleton className="col-span-6 h-6 w-[120px]" />
              <Skeleton className="col-span-2 h-6 w-[120px]" />
              <Skeleton className="col-span-2 h-6 w-[120px]" />
              <Skeleton className="col-span-2 h-6 w-[120px]" />
            </div>
            {/* ============= ROW ============= */}
            <div className="grid grid-cols-12 gap-4 mb-4">
              <Skeleton className="col-span-6 h-16 w-full" />
              <Skeleton className="col-span-2 h-9 w-full" />
              <Skeleton className="col-span-2 h-9 w-full" />
              <Skeleton className="col-span-2 h-9 w-full" />
            </div>
          </div>
          {/* ++++++++++++++ TOTAL ++++++++++++++ */}
          <div className="flex justify-end">
            <div className="w-1/3 space-y-1">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
          {/* ++++++++++++++ NOTE ++++++++++++++ */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-[50px]" />
            <Skeleton className="h-16 w-full" />
          </div>
          {/* ++++++++++++++ BUTTONS ++++++++++++++ */}
          <div className="flex items-center gap-4 justify-between mt-6">
            <Skeleton className="h-10 w-[80px]" />
            <div className="flex gap-4">
              <Skeleton className="h-10 w-[120px]" />
              <Skeleton className="h-10 w-[180px]" />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
