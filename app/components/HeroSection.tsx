import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/public/heroImage.jpg";
import TypingAnimation from "@/components/ui/typing-animation";
import { TextAnimate } from "@/components/ui/text-animate";
import Safari from "@/components/ui/safari";
export default function HeroSection() {
  return (
    <>
      <div id="Home">
        <div className="relative isolate px-6 lg:px-8">
          <div className="mx-auto max-w-2xl pt-20 lg:pt-24">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="flex gap-2 rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Your Free Invoice Management Solution{" "}
                <Link
                  href="#HowItWorks"
                  className="flex items-center gap-1 font-semibold text-green-600"
                >
                  Read more
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                Welcome to{" "}
                <TypingAnimation className="text-5xl sm:text-7xl inline-flex animate-text-gradient bg-gradient-to-r from-[#63f2ad] via-[#25e28d] to-[#cdfee1] bg-[200%_auto] bg-clip-text  text-transparent">
                  Invoxify
                </TypingAnimation>
              </h1>
              <TextAnimate
                animation="slideUp"
                by="word"
                className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8"
              >
                Effortless invoicing for businesses and freelancers, completely
                free with Invoxify.
              </TextAnimate>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href="/login">
                  <Button className="bg-green-500 hover:bg-green-700">
                    Get started
                  </Button>
                </Link>
                <Link href="#HowItWorks">
                  <Button variant="ghost">Learn more</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-8 pt-8">
          <div className="relative">
            <Safari
              url="infoxify.com"
              className="size-full"
              imageSrc="https://i.imgur.com/mFuuqks.gif"
            />
          </div>
        </div>
      </div>
    </>
  );
}
