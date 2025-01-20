import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { auth, signIn } from "../utils/auth";
import { SubmitButton } from "../components/SubmitButtons";
import { redirect } from "next/navigation";
import Image from "next/image";
import logo from "@/public/invoxify_Logo.png";

export default async function Login() {
  // This will check is the user is already login if yes then it will redirect to the dashboard page
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center px-4 bg-gray-50">
        <Card className="max-w-lg md:p-4">
          <CardHeader className="flex flex-col gap-4 justify-center items-center text-center">
            <Image src={logo} alt="logo" className="w-[250px]" />
            <div>
              <CardTitle className="text-2xl">
                Sign in to your account
              </CardTitle>
              <CardDescription>
                Enter your credentials to login to your account
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form
              action={async (formData) => {
                "use server";
                await signIn("nodemailer", formData);
              }}
              className="flex flex-col gap-y-4"
            >
              <div className="flex flex-col gap-y-2">
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                />
              </div>
              <SubmitButton text="Login" />
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
