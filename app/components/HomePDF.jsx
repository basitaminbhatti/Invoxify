import { AnimatedList } from "@/components/ui/animated-list";
import Image from "next/image";
import InvoxifyPDF from "@/public/Invoxify_Pdf_View.jpg";
import { Download, Eye, Mail, Pen } from "lucide-react";
import { TextAnimate } from "@/components/ui/text-animate";

const features = [
  {
    name: "Editable Details",
    description: "Modify item descriptions, quantities, and totals with ease.",
    icon: Pen,
  },
  {
    name: "Instant Preview",
    description:
      "See exactly how your invoice will appear as a PDF before sending.",
    icon: Eye,
  },
  {
    name: "Email Integration",
    description:
      "Send PDF invoices directly from Invoxify without switching tools.",
    icon: Mail,
  },
  {
    name: "Download Invoices",
    description:
      "Easily download your invoices as PDF files for offline access, record-keeping, or sharing through other channels.",
    icon: Download,
  },
];
export default function HomePDF() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32" id="PDFInvoice">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-green-600">
            PDF Invoice Features
          </h2>
          <TextAnimate
            animation="blurInUp"
            by="character"
            className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance"
          >
            Ready to Send PDFs
          </TextAnimate>
          <TextAnimate
            animation="slideUp"
            by="word"
            className="mt-6 text-lg/8 text-gray-600"
          >
            Easily create invoices that automatically generate as high-quality
            PDFs. Share them directly with clients via email or download for
            your records. Each PDF invoice is designed to look polished and
            professional, giving your business the credibility it deserves.
          </TextAnimate>
        </div>
        <div className="mx-auto grid mt-4 max-w-2xl grid-cols-1 gap-x-8 gap-y-4 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <Image
            alt="Invoxify PDF"
            src={InvoxifyPDF}
            className="shrink-0 w-full h-[400px] py-4 skew-x-[10deg] md:-rotate-1 rounded-md object-contain"
          />
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
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
        </div>
      </div>
    </div>
  );
}
