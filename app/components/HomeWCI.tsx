import { TextAnimate } from "@/components/ui/text-animate";
import { Bell, Mail, Pen, SaveAll } from "lucide-react";

const features = [
  {
    name: "Create Professional Invoices in Seconds",
    description:
      "Design and generate sleek, professional invoices with just a few clicks. Personalize them with your logo and details to leave a lasting impression on your clients.",
    icon: Pen,
  },
  {
    name: "Email Invoices Directly",
    description:
      "Send your invoices directly to clients via email. Your clients will receive a PDF version of the invoice, ensuring hassle-free communication and record-keeping.",
    icon: Bell,
  },
  {
    name: "Automated Payment Reminders",
    description:
      "Forget chasing payments! Invoxify automatically sends reminders to your clients, helping you get paid on time without the awkward follow-ups.",
    icon: Mail,
  },
  {
    name: "Draft and Save",
    description:
      "Not ready to finalize your invoice? No problem! Save drafts and edit them whenever you're ready to send",
    icon: SaveAll,
  },
];

export default function HomeWCI() {
  return (
    <div className="pt-20 lg:pt-24" id="whyChooseInvoxify">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-green-600">
            The Invoxify Advantage
          </h2>
          <TextAnimate
            animation="blurInUp"
            by="character"
            className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance"
          >
            Why Choose Invoxify?
          </TextAnimate>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-green-600">
                    <feature.icon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </div>
                  <TextAnimate animation="scaleUp" by="text">
                    {feature.name}
                  </TextAnimate>
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
