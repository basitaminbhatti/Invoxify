"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface iAppProps {
  text: string;
  name?: string;
  value?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

export function SubmitButton({
  text,
  variant,
  value,
  name,
  onClick,
}: iAppProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          disabled
          className="w-full"
          variant={variant}
          value={value}
          name={name}
        >
          <Loader2 className="size-4 mr-2 animate-spin" /> Please wait...
        </Button>
      ) : (
        <Button
          type="submit"
          className="w-full"
          variant={variant}
          value={value}
          name={name}
          onClick={onClick}
        >
          {text}
        </Button>
      )}
    </>
  );
}
