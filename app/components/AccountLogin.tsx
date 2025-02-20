import { Button } from "@/components/ui/button";
import { signIn } from "../utils/auth";
import { signInWithProvider } from "../utils/serverActions";
import { SubmitButton } from "./SubmitButtons";
export default function AccountLogin() {
  return (
    <div className="flex flex-col gap-3 mt-8">
      {/* ====== Facebook ====== */}
      <form action={signInWithProvider.bind(null, "facebook")}>
        <SubmitButton variant="outline">
          <img
            src="https://www.svgrepo.com/show/475647/facebook-color.svg"
            alt="Facebook"
            className="h-[18px] w-[18px]"
          ></img>
          Login with Facebook
        </SubmitButton>
      </form>
      {/* ====== Google ====== */}
      <form action={signInWithProvider.bind(null, "google")}>
        <SubmitButton variant="outline">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-[18px] w-[18px]"
          ></img>
          Login with Google
        </SubmitButton>
      </form>
      {/* ====== Linkedin ====== */}
      <form action={signInWithProvider.bind(null, "linkedin")}>
        <SubmitButton variant="outline">
          <img
            src="https://www.svgrepo.com/show/354000/linkedin-icon.svg"
            alt="Linkedin"
            className="h-[18px] w-[18px]"
          ></img>
          Login with Linkedin
        </SubmitButton>
      </form>
      {/* ====== Github ====== */}
      <form action={signInWithProvider.bind(null, "github")}>
        <SubmitButton variant="outline">
          <img
            src="https://www.svgrepo.com/show/512317/github-142.svg"
            alt="GitHub"
            className="h-[18px] w-[18px]"
          ></img>
          Login with Github
        </SubmitButton>
      </form>
    </div>
  );
}
