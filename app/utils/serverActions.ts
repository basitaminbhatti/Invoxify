"use server";

import { signIn } from "./auth"; // Import signIn from auth utility

export async function signInWithProvider(provider: string) {
  await signIn(provider);
}

export async function signInWithEmail(formData: FormData) {
  await signIn("nodemailer", formData);
}
