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
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema } from "@/app/utils/zodSchemas";
import { createInvoice } from "@/app/actions";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { SubmitButton } from "./SubmitButtons";
import Link from "next/link";

export default function CreateInvoice() {
  const [lastResult, action] = useActionState(createInvoice, undefined);
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currency, setCurrency] = useState("PKR");
  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");

  const calcualteTotal = (Number(quantity) || 0) * (Number(rate) || 0);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
          <div className="flex flex-col gap-1 w-fit mb-6">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">Draft</Badge>
              <Input
                name={fields.invoiceName.name}
                key={fields.invoiceName.key}
                defaultValue={fields.invoiceName.initialValue}
                placeholder="Invoice Name"
              />
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
                  defaultValue={fields.invoiceNumber.initialValue}
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
                defaultValue="PKR"
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
          {/* ++++++++++++++ Account Information ++++++++++++++ */}
          {/* <div>
            <Label>Account Information:</Label>
            <div className="grid md:grid-cols-2 gap-3 mb-6">
              <Input placeholder="Bank Name" />
              <Input placeholder="Account Name" />
              <Input placeholder="Account Number" />
              <Input placeholder="IBAN" />
            </div>
          </div> */}
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
                  // defaultValue={firstName + " " + lastName}
                />
                <p className="text-red-500 text-sm">{fields.fromName.errors}</p>
                <Input
                  placeholder="Your Email"
                  name={fields.fromEmail.name}
                  key={fields.fromEmail.key}
                  // defaultValue={email}
                />
                <p className="text-red-500 text-sm">
                  {fields.fromEmail.errors}
                </p>
                <Input
                  placeholder="Your Phone Number"
                  name={fields.fromNumber.name}
                  key={fields.fromNumber.key}
                />
                <p className="text-red-500 text-sm">
                  {fields.fromNumber.errors}
                </p>
                <Input
                  placeholder="Your Address"
                  name={fields.fromAddress.name}
                  key={fields.fromAddress.key}
                  // defaultValue={address}
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
                  defaultValue={fields.clientName.initialValue}
                />
                <p className="text-red-500 text-sm">
                  {fields.clientName.errors}
                </p>
                <Input
                  placeholder="Client Email"
                  name={fields.clientEmail.name}
                  key={fields.clientEmail.key}
                  defaultValue={fields.clientEmail.initialValue}
                />
                <p className="text-red-500 text-sm">
                  {fields.clientEmail.errors}
                </p>
                <Input
                  placeholder="Client Phone Number"
                  name={fields.clientNumber.name}
                  key={fields.clientNumber.key}
                  defaultValue={fields.clientNumber.initialValue}
                />
                <p className="text-red-500 text-sm">
                  {fields.clientNumber.errors}
                </p>
                <Input
                  placeholder="Client Address"
                  name={fields.clientAddress.name}
                  key={fields.clientAddress.key}
                  defaultValue={fields.clientAddress.initialValue}
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
                defaultValue={fields.dueDate.initialValue}
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
                  defaultValue={fields.invoiceItemDescription.initialValue}
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
              defaultValue={fields.note.initialValue}
            />
            <p className="text-red-500 text-sm">{fields.note.errors}</p>
          </div>
          {/* ++++++++++++++ BUTTONS ++++++++++++++ */}
          <div className="flex items-center gap-4 justify-end mt-6">
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/dashboard/invoices"
            >
              Cancel
            </Link>
            <div>
              <SubmitButton text="Send Invoice to Client" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
