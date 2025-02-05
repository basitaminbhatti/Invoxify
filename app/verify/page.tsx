import { auth } from "../utils/auth";
import { redirect } from "next/navigation";
import { TextAnimate } from "@/components/ui/text-animate";
import Image from "next/image";
import LoginImage from "@/public/Invoxify_login.jpg";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default async function Login() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <>
      <div className="flex flex-wrap w-screen h-screen overflow-hidden">
        <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center text-center pt-8 px-6 md:pt-0">
          <div className="mb-4 mx-auto flex size-20 items-center justify-center rounded-full bg-green-100">
            <Mail className="size-12 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">Check your Email</p>
          <p className="mt-2 text-gray-500">
            We have sent a verifcation link to your email address.
          </p>
          <div className="mt-4 rounded-md bg-yellow-50 border-yellow-300 p-4">
            <div className="flex items-center justify-center">
              <AlertCircle className="size-5 text-yellow-400" />

              <p className="text-sm font-medium text-yellow-700 ml-3">
                Be sure to check your spam folder!
              </p>
            </div>
          </div>
          <Link
            href="/"
            className={buttonVariants({
              className: "w-full mt-4",
              variant: "outline",
            })}
          >
            <ArrowLeft className="size-4 mr-2" /> Back to Homepage
          </Link>
        </div>

        <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
          <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
            <TextAnimate
              className="mb-8 text-xl font-semibold leading-9"
              animation="fadeIn"
              by="line"
              as="p"
            >
              {`I'm Abdul Basit, and I founded Invoxify,\n\nI built this free invoicing tool to help businesses and freelancers save time and effort. Developed as a practice project on my portfolio site, Ainbae.\nInvoxify reflects my commitment to simplicity and innovation.\nThank you for joining me on this journey. Enjoy a smoother, smarter invoicing experience with Invoxify!`}
            </TextAnimate>
            <TextAnimate
              animation="slideUp"
              by="text"
              className="text-xl font-semibold"
            >
              Abdul Basit
            </TextAnimate>
            <TextAnimate
              animation="slideLeft"
              by="character"
              className="mb-7 text-lg opacity-70"
            >
              Founder, Invoxify
            </TextAnimate>
          </div>
          <Image
            src={LoginImage}
            alt="Login Image"
            className="-z-1 absolute top-0 h-full w-full object-cover opacity-60  "
          />
        </div>
      </div>
    </>
  );
}
