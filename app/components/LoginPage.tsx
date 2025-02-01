"use client";
import Image from "next/image";
import logo from "@/public/invoxify_Logo.png";
import LoginImage from "@/public/Invoxify_login.jpg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import EmailLogin from "./EmailLogin";
import { Mail } from "lucide-react";
import AccountLogin from "./AccountLogin";
import { useState } from "react";
import { motion } from "framer-motion";
import { TextAnimate } from "@/components/ui/text-animate";

export default function LoginPage() {
  const [showEmailLogin, setShowEmailLogin] = useState(false);

  return (
    <div className="flex flex-wrap w-screen h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="flex w-full flex-col md:w-1/2"
      >
        <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center text-center pt-8 md:px-6 md:pt-0">
          <div className="flex mx-auto my-auto md:px-6 pb-8">
            <Link href="/">
              <Image src={logo} alt="logo" className="w-[250px]" />
            </Link>
          </div>
          <p className="text-2xl font-bold text-green-600">
            🚀 Get Started with One Click
          </p>
          <p className="mt-2 text-gray-500">
            Login or Signup Made Easy – Just Choose Your Preferred Account.
          </p>

          {!showEmailLogin ? (
            <>
              <AccountLogin />
              {/* ============== Signup With Email ============== */}
              <Button
                onClick={() => setShowEmailLogin(true)}
                variant="outline"
                className="w-full mt-4"
              >
                <Mail />
                Login with Email
              </Button>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col space-y-4"
            >
              {/* ============== Signup With Account ============== */}
              <EmailLogin />
              <Button
                onClick={() => setShowEmailLogin(false)}
                variant="outline"
                className="w-full py-2"
              >
                Back
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
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
  );
}
