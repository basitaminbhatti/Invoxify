import { signOut } from "../utils/auth";
import { RequireUser } from "../utils/hooks";

export default async function DashboardPage() {
  const session = await RequireUser();
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
