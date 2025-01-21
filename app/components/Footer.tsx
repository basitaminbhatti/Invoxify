import Link from "next/link";
import logo from "@/public/invoxify_Logo_White.png";
import Image from "next/image";
import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const menuItems = [
    { href: "#Home", label: "Home" },
    { href: "#whyChooseInvoxify", label: "Why Choose Invoxify?" },
    { href: "#HowItWorks", label: "How It Works" },
    { href: "#PDFInvoice", label: "PDF Invoice" },
  ];

  return (
    <footer className="p-4 bg-gray-900 md:p-8 lg:p-10">
      <div className="mx-auto max-w-screen-xl text-center">
        <Link href="/" className="flex justify-center">
          <Image src={logo} alt="Invoxify" className="w-[200px]" />
        </Link>
        <p className="my-6 text-gray-400">
          Create, send, and track invoices easily with Invoxify
        </p>
        <ul className="flex flex-wrap justify-center items-center mb-6 text-white">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="mr-4 hover:text-green-600 md:mr-6 transition duration-300"
            >
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <span className="text-sm sm:text-center text-gray-400">
          &copy; {currentYear} <Link href="/">Invoxify</Link>, Inc. All Rights
          Reserved.
        </span>
        <div className="text-sm sm:text-center text-gray-400">
          Made with <Heart className="inline mx-1 text-green-600 size-4" /> by
          <Link href="https://www.ainbae.com" target="_blank" rel="noreferrer">
            {" "}
            Ainbae
          </Link>
        </div>
      </div>
    </footer>
  );
}
