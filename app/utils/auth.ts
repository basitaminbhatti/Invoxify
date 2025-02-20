import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./db";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import LinkedIn from "next-auth/providers/linkedin";

import Nodemailer from "next-auth/providers/nodemailer";
import { emailClient } from "./mailtrap";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Google,
    Facebook,
    LinkedIn,
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({ identifier, url, provider }) {
        const sender = {
          email: "hello@invoxify.tech",
          name: "Invoxify",
        };
        const recipients = [
          {
            email: identifier,
          },
        ];
        // // EMAIL SENDING
        await emailClient.send({
          from: sender,
          to: recipients,
          template_uuid: "10df359d-0c40-4105-829c-586544897236",
          template_variables: {
            InvoiceLink: url,
            Year: new Date().getFullYear().toString(),
          },
        });
      },
    }),
  ],
  pages: {
    verifyRequest: "/verify",
  },
});
