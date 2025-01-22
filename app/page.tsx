import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HomeWCI from "./components/HomeWCI";
import HowItWorks from "./components/HowItWorks";
import HomePDF from "./components/HomePDF";
import { auth } from "./utils/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // This will check is the user is already login if yes then it will redirect to the dashboard page
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <Header />
      <HeroSection />
      <HomeWCI />
      <HowItWorks />
      <HomePDF />
      <Footer />
    </>
  );
}
