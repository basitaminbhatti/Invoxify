"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { SubmitButton } from "./SubmitButtons";

export default function CreateInvoice() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="flex flex-col gap-1 w-fit mb-6">
          <div className="flex items-center gap-4">
            <Badge variant="secondary">Draft</Badge>
            <Input placeholder="Test 123" />
          </div>
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
              <Input className="rounded-l-none" placeholder="5" />
            </div>
          </div>
          {/* =========== Currency =========== */}
          <div>
            <Label>Currency</Label>
            <Select defaultValue="PKR">
              <SelectTrigger>
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PKR">Pakistani Rupee -- PKR</SelectItem>
                <SelectItem value="USD">United States Dollar -- USD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ++++++++++++++ Account Information ++++++++++++++ */}
        <div>
          <Label>Account Information:</Label>
          <div className="grid md:grid-cols-2 gap-3 mb-6">
            <Input placeholder="Bank Name" />
            <Input placeholder="Account Name" />
            <Input placeholder="Account Number" />
            <Input placeholder="IBAN" />
          </div>
        </div>

        {/* ++++++++++++++ USER / CLIENT ++++++++++++++ */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* =========== FROM =========== */}
          <div>
            <Label>From</Label>
            <div className="space-y-2">
              <Input placeholder="Your Name" />
              <Input placeholder="Your Email" />
              <Input placeholder="Your Phone Number" />
              <Input placeholder="Your Address" />
            </div>
          </div>
          {/* =========== TO =========== */}
          <div>
            <Label>To</Label>
            <div className="space-y-2">
              <Input placeholder="Client Name" />
              <Input placeholder="Client Email" />
              <Input placeholder="Client Phone Number" />
              <Input placeholder="Client Address" />
            </div>
          </div>
        </div>

        {/* ++++++++++++++ DATE / DUE DATE ++++++++++++++ */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* =========== DATE =========== */}
          <div>
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
          </div>

          {/* =========== DUE DATE =========== */}
          <div>
            <Label>Invoice Due</Label>
            <Select defaultValue="0">
              <SelectTrigger>
                <SelectValue placeholder="Select due date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Due on Reciept</SelectItem>
                <SelectItem value="15">Net 15</SelectItem>
                <SelectItem value="30">Net 30</SelectItem>
              </SelectContent>
            </Select>
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
              <Textarea placeholder="Item name & description" />
            </div>
            <div className="col-span-2">
              <Input placeholder="1" type="number" />
            </div>
            <div className="col-span-2">
              <Input placeholder="1" type="number" />
            </div>
            <div className="col-span-2">
              <Input placeholder="1" type="number" />
            </div>
          </div>
        </div>

        {/* ++++++++++++++ TOTAL ++++++++++++++ */}
        <div className="flex justify-end">
          <div className="w-1/3">
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>Rs 3600</span>
            </div>
            <div className="flex justify-between py-2 border-t">
              <span>Total</span>
              <span className="font-medium underline underline-offset-2">
                Rs 3600
              </span>
            </div>
          </div>
        </div>

        {/* ++++++++++++++ NOTE ++++++++++++++ */}
        <div>
          <Label>Note</Label>
          <Textarea placeholder="Add your Note/s right here..." />
        </div>

        {/* ++++++++++++++ BUTTONS ++++++++++++++ */}
        <div className="flex items-center justify-end mt-6">
          <div>
            <SubmitButton text="Send Invoice to Client" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
