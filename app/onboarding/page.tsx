"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "../components/app/components/SubmitButtons";
import { onboardUser } from "../actions";
import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchema } from "../utils/zodSchemas";

export default function OnboardingPage() {
  const [lastResult, action] = useActionState(onboardUser, undefined);
  const [form, fields] = useForm({
    lastResult, // Sync the result of last submission

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: onboardingSchema,
      });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">You are almost Fininshed!</CardTitle>
          <CardDescription>
            Enter you information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-4"
            action={action}
            id={form.id}
            onSubmit={form.onSubmit}
            noValidate
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label>First Name</Label>
                <Input
                  key={fields.firstName.key}
                  name={fields.firstName.name}
                  defaultValue={fields.firstName.initialValue}
                  placeholder="Abdul"
                />
                <p className="text-red-500 text-sm">
                  {fields.firstName.errors}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Last Name</Label>
                <Input
                  key={fields.lastName.key}
                  name={fields.lastName.name}
                  defaultValue={fields.lastName.initialValue}
                  placeholder="Basit"
                />
                <p className="text-red-500 text-sm">{fields.lastName.errors}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Address</Label>
              <Input
                key={fields.address.key}
                name={fields.address.name}
                defaultValue={fields.address.initialValue}
                placeholder="123 Main St"
              />
              <p className="text-red-500 text-sm">{fields.address.errors}</p>
            </div>
            <SubmitButton text="Create Account" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
