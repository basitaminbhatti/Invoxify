import { AnimatedList } from "@/components/ui/animated-list";
import Image from "next/image";
import ProductImage from "@/public/heroImage.jpg";
import { ChartColumn, CircleUserRound, Mail, Pen } from "lucide-react";
import { TextAnimate } from "@/components/ui/text-animate";
import Safari from "@/components/ui/safari";

const features = [
  {
    name: "Sign Up for Free",
    description:
      "Create an account in seconds and start using Invoxify immediately.",
    icon: CircleUserRound,
  },
  {
    name: "Create Your Invoice",
    description:
      "Fill in the details, add your client’s information, and personalize your invoice.",
    icon: Pen,
  },
  {
    name: "Send and Manage",
    description:
      "Send invoices via email, monitor payment statuses, and send reminders automatically.",
    icon: Mail,
  },
  {
    name: "Analyze Your Revenue",
    description:
      "Use the built-in graph to track your income and make data-driven decisions.",
    icon: ChartColumn,
  },
];

export default function HowItWorks() {
  return (
    <div className="overflow-hidden bg-white pt-24 sm:pt-32" id="HowItWorks">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-green-600">
                Invoxify: Your Smart Choice
              </h2>
              <TextAnimate
                animation="blurInUp"
                by="character"
                className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl"
              >
                How It Works
              </TextAnimate>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                <AnimatedList>
                  {features
                    .slice() //Create a shallow copy of the array to avoid mutating the original
                    .reverse() // Reverse the array to get it in descending order
                    .map((feature) => (
                      <div key={feature.name} className="relative pl-9">
                        <dt className="inline font-semibold text-gray-900">
                          <feature.icon
                            aria-hidden="true"
                            className="absolute top-1 left-1 size-5 text-green-600"
                          />
                          {feature.name}
                        </dt>{" "}
                        <dd className="inline">{feature.description}</dd>
                      </div>
                    ))}
                </AnimatedList>
              </dl>
            </div>
          </div>
          <Safari
            url="infoxify.com"
            className="size-full sm:w-[57rem] md:-ml-4 lg:-ml-0"
            imageSrc="https://i.imgur.com/64te2Hw.jpeg"
          />
        </div>
      </div>
    </div>
  );
}
