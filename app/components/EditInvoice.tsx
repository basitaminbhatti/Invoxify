"use client";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { useActionState, useState } from "react";
import { SubmitButton } from "./SubmitButtons";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema } from "@/app/utils/zodSchemas";
import { handleInvoiceActions } from "@/app/actions";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { Prisma } from "@prisma/client";
import Link from "next/link";

interface iAppProps {
  data: Prisma.InvoiceGetPayload<{}>;
}

export default function EditInvoice({ data }: iAppProps) {
  const [lastResult, action] = useActionState(handleInvoiceActions, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: invoiceSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const [selectedDate, setSelectedDate] = useState(data.date);
  const [rate, setRate] = useState(data.invoiceItemRate.toString());
  const [quantity, setQuantity] = useState(data.invoiceItemQuantity.toString());
  const [currency, setCurrency] = useState(data.currency);

  const calcualteTotal = (Number(quantity) || 0) * (Number(rate) || 0);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
          <div className="flex flex-col gap-1 w-fit mb-6">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">{data.status}</Badge>
              <Input
                name={fields.invoiceName.name}
                key={fields.invoiceName.key}
                defaultValue={data.invoiceName}
                placeholder="Invoice Name"
              />
              {/* hidden input to store the id value for Edit Invoice Only to avoid Error */}
              <input type="hidden" name="id" value={data.id} />
              <input type="hidden" name="action" id="actionInput" />
              <input type="hidden" name="status" defaultValue={data.status} />
            </div>
            <p className="text-sm text-red-500">{fields.invoiceName.errors}</p>
          </div>
          {/* ++++++++++++++ INVOICE NUMBER / CURRENCY ++++++++++++++ */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* =========== INVOICE NUMBER =========== */}
            <div>
              <Label>Invoice No.</Label>
              <div className="flex">
                <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">
                  #
                </span>
                <Input
                  className="rounded-l-none"
                  name={fields.invoiceNumber.name}
                  key={fields.invoiceNumber.key}
                  defaultValue={data.invoiceNumber}
                  placeholder="5"
                />
              </div>
              <p className="text-red-500 text-sm">
                {fields.invoiceNumber.errors}
              </p>
            </div>
            {/* =========== Currency =========== */}
            <div>
              <Label>Currency</Label>
              <Select
                defaultValue={data.currency}
                name={fields.currency.name}
                key={fields.currency.key}
                onValueChange={(value) => setCurrency(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PKR">Pakistani Rupee -- PKR</SelectItem>
                  <SelectItem value="USD">
                    United States Dollar -- USD
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500 text-sm">{fields.currency.errors}</p>
            </div>
          </div>
          {/* ++++++++++++++ USER / CLIENT ++++++++++++++ */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* =========== FROM =========== */}
            <div>
              <Label>From</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Your Name"
                  name={fields.fromName.name}
                  key={fields.fromName.key}
                  defaultValue={data.fromName}
                />
                <p className="text-red-500 text-sm">{fields.fromName.errors}</p>
                <Input
                  placeholder="Your Email"
                  name={fields.fromEmail.name}
                  key={fields.fromEmail.key}
                  defaultValue={data.fromEmail}
                />
                <p className="text-red-500 text-sm">
                  {fields.fromEmail.errors}
                </p>
                <Input
                  placeholder="Your Phone Number"
                  name={fields.fromNumber.name}
                  key={fields.fromNumber.key}
                  defaultValue={data.fromNumber?.toString()}
                />
                <p className="text-red-500 text-sm">
                  {fields.fromNumber.errors}
                </p>
                <Input
                  placeholder="Your Address"
                  name={fields.fromAddress.name}
                  key={fields.fromAddress.key}
                  defaultValue={data.fromAddress}
                />
                <p className="text-red-500 text-sm">
                  {fields.fromAddress.errors}
                </p>
              </div>
            </div>
            {/* =========== TO =========== */}
            <div>
              <Label>To</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Client Name"
                  name={fields.clientName.name}
                  key={fields.clientName.key}
                  defaultValue={data.clientName}
                />
                <p className="text-red-500 text-sm">
                  {fields.clientName.errors}
                </p>
                <Input
                  placeholder="Client Email"
                  name={fields.clientEmail.name}
                  key={fields.clientEmail.key}
                  defaultValue={data.clientEmail}
                />
                <p className="text-red-500 text-sm">
                  {fields.clientEmail.errors}
                </p>
                <Input
                  placeholder="Client Phone Number"
                  name={fields.clientNumber.name}
                  key={fields.clientNumber.key}
                  defaultValue={data.clientNumber?.toString()}
                />
                <p className="text-red-500 text-sm">
                  {fields.clientNumber.errors}
                </p>
                <Input
                  placeholder="Client Address"
                  name={fields.clientAddress.name}
                  key={fields.clientAddress.key}
                  defaultValue={data.clientAddress}
                />
                <p className="text-red-500 text-sm">
                  {fields.clientAddress.errors}
                </p>
              </div>
            </div>
          </div>
          {/* ++++++++++++++ DATE / DUE DATE ++++++++++++++ */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* =========== DATE =========== */}
            <div>
              <input
                type="hidden"
                name={fields.date.name}
                value={selectedDate.toISOString()}
              />{" "}
              {/* hidden input use to store date value */}
              <div>
                <Label>Date</Label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[280px] text-left justify-start"
                  >
                    <CalendarIcon />
                    {selectedDate ? (
                      new Intl.DateTimeFormat("en-US", {
                        dateStyle: "long",
                      }).format(selectedDate)
                    ) : (
                      <span>Pick a Date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    selected={selectedDate}
                    onSelect={(date) => setSelectedDate(date || new Date())}
                    mode="single"
                    fromDate={new Date()}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-red-500 text-sm">{fields.date.errors}</p>
            </div>
            {/* =========== DUE DATE =========== */}
            <div>
              <Label>Invoice Due</Label>
              <Select
                name={fields.dueDate.name}
                key={fields.dueDate.key}
                defaultValue={data.dueDate.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select due date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Due on Reciept</SelectItem>
                  <SelectItem value="15">Net 15</SelectItem>
                  <SelectItem value="30">Net 30</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500 text-sm">{fields.dueDate.errors}</p>
            </div>
          </div>
          {/* ++++++++++++++ CHART ++++++++++++++ */}
          <div>
            {/* ============= HEADINGS ============= */}
            <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
              <p className="col-span-6">Description</p>
              <p className="col-span-2">Quantity</p>
              <p className="col-span-2">Rate</p>
              <p className="col-span-2">Amount</p>
            </div>

            {/* ============= ROW ============= */}
            <div className="grid grid-cols-12 gap-4 mb-4">
              <div className="col-span-6">
                <Textarea
                  placeholder="Item name & description"
                  name={fields.invoiceItemDescription.name}
                  key={fields.invoiceItemDescription.key}
                  defaultValue={data.invoiceItemDescription}
                />
                <p className="text-red-500 text-sm">
                  {fields.invoiceItemDescription.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  placeholder="0"
                  type="number"
                  name={fields.invoiceItemQuantity.name}
                  key={fields.invoiceItemQuantity.key}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <p className="text-red-500 text-sm">
                  {fields.invoiceItemQuantity.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  placeholder="0"
                  type="number"
                  name={fields.invoiceItemRate.name}
                  key={fields.invoiceItemRate.key}
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
                <p className="text-red-500 text-sm">
                  {fields.invoiceItemRate.errors}
                </p>
              </div>
              <div className="col-span-2">
                <Input
                  value={formatCurrency({
                    amount: calcualteTotal,
                    currency: currency as any,
                  })}
                  disabled
                />
              </div>
            </div>
          </div>
          {/* ++++++++++++++ TOTAL ++++++++++++++ */}
          <div className="flex justify-end">
            <div className="w-1/3">
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>
                  {formatCurrency({
                    amount: calcualteTotal,
                    currency: currency as any,
                  })}
                </span>
              </div>
              <div className="flex justify-between py-2 border-t">
                <span>Total ({currency})</span>
                <span className="font-medium underline underline-offset-2">
                  {formatCurrency({
                    amount: calcualteTotal,
                    currency: currency as any,
                  })}
                </span>
              </div>
            </div>

            {/* hidden input to store the total value */}
            <input
              type="hidden"
              name={fields.total.name}
              value={calcualteTotal}
            />
          </div>

          {/* ++++++++++++++ NOTE ++++++++++++++ */}
          <div>
            <Label>Note</Label>
            <Textarea
              placeholder="Add your Note/s right here..."
              name={fields.note.name}
              key={fields.note.key}
              defaultValue={data.note ?? undefined}
            />
            <p className="text-red-500 text-sm">{fields.note.errors}</p>
          </div>
          {/* ++++++++++++++ BUTTONS ++++++++++++++ */}
          <div className="flex items-center gap-4 justify-between mt-6">
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/dashboard/invoices"
            >
              Cancel
            </Link>
            {data.status == "DRAFT" ? (
              <div className="flex gap-4">
                <div>
                  <SubmitButton
                    value="editDraftInvoice"
                    variant="secondary"
                    text="Save as Draft"
                    name="action"
                    onClick={() => {
                      const actionInput = document.getElementById(
                        "actionInput"
                      ) as HTMLInputElement | null;
                      if (actionInput) {
                        actionInput.value = "editDraftInvoice";
                      } else {
                        console.error(
                          "Element with ID 'actionInput' not found."
                        );
                      }
                    }}
                  />
                </div>
                <div>
                  <SubmitButton
                    value="editClientInvoice"
                    variant="default"
                    text="Send Invoice to Client"
                    name="action"
                    onClick={() => {
                      const actionInput = document.getElementById(
                        "actionInput"
                      ) as HTMLInputElement | null;
                      if (actionInput) {
                        actionInput.value = "editClientInvoice";
                      } else {
                        console.error(
                          "Element with ID 'actionInput' not found."
                        );
                      }
                    }}
                  />
                </div>
              </div>
            ) : (
              <div>
                <SubmitButton
                  value="editInvoice"
                  text="Update Invoice"
                  name="action"
                  onClick={() => {
                    const actionInput = document.getElementById(
                      "actionInput"
                    ) as HTMLInputElement | null;
                    if (actionInput) {
                      actionInput.value = "editInvoice";
                    } else {
                      console.error("Element with ID 'actionInput' not found.");
                    }
                  }}
                />
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
