import { auth } from "../utils/auth";
import { redirect } from "next/navigation";
import LoginPage from "../components/LoginPage";
import Footer from "../components/Footer";

export default async function Login() {
  // This will check is the user is already login if yes then it will redirect to the dashboard page
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <>
      <LoginPage />
    </>
  );
}
