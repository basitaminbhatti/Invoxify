import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/invoxify_Logo.png";
export default function Header() {
  const menuItems = [
    { href: "#Home", label: "Home" },
    { href: "#whyChooseInvoxify", label: "Why Choose Invoxify?" },
    { href: "#HowItWorks", label: "How It Works" },
    { href: "#PDFInvoice", label: "PDF Invoice" },
  ];
  return (
    <header>
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/">
            <Image src={logo} alt="Invoxify Logo" className="w-[200px]" />
          </Link>
          <div className="flex items-center lg:order-2 gap-4">
            <Link href="/login" className="hidden lg:block">
              <Button className="bg-green-500 hover:bg-green-700">
                Get started
              </Button>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden ">
                  <Menu className="size-5"></Menu>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>
                    <nav className="mt-10">
                      <ul className="grid gap-8 font-medium text-xl">
                        {menuItems.map((item, index) => (
                          <li
                            key={index}
                            className="hover:text-green-500 transition duration-300"
                          >
                            <Link href={item.href}>{item.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </SheetTitle>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
          <ul className="hidden lg:flex justify-center items-center font-medium space-x-8">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="hover:text-green-500 transition duration-300"
              >
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
