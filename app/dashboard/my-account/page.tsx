import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/app/components/SubmitButtons";
import { RequireUser } from "@/app/utils/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import prisma from "@/app/utils/db";
import { Metadata } from "next";

async function getUserData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      firstName: true,
      lastName: true,
      email: true,
      address: true,
      image: true,
    },
  });

  return data;
}

export const metadata: Metadata = {
  title: "My Account",
};

export default async function MyAccount() {
  const session = await RequireUser();
  const data = await getUserData(session.user?.id as string);

  return (
    <>
      <div className="flex items-center justify-center px-4">
        <Card className="max-w-sm">
          <CardHeader className="flex flex-col justify-center items-center">
            <CardTitle className="text-2xl">My Account</CardTitle>
            <Avatar className="w-36 h-36 border-4 border-green-600/60 rounded-full">
              <AvatarImage src={data?.image as any} alt="Profile" />
              <AvatarFallback className="text-3xl">
                {(data?.firstName || "NA").slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <Label>First Name</Label>
                  <Input
                    value={data?.firstName || data?.name || " "}
                    readOnly
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Last Name</Label>
                  <Input value={data?.lastName || data?.name || " "} readOnly />
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input value={data?.email || " "} readOnly />
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Address</Label>
                <Input value={data?.address || " "} readOnly />
              </div>
              <SubmitButton text="Update" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
