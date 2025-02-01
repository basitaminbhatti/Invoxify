import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "../components/SubmitButtons";
import { signInWithEmail } from "../utils/serverActions";
export default function EmailLogin() {
  return (
    <form action={signInWithEmail} className="flex flex-col gap-4">
      <div className="flex flex-col gap-y-2">
        <Label className="text-left">Email</Label>
        <Input
          name="email"
          type="email"
          required
          placeholder="Enter your email"
        />
      </div>
      <SubmitButton text="Login" />
    </form>
  );
}
