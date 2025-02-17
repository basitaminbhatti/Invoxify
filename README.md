# Invoxify

**Simplify Your Invoicing**

Invoxify is a free, web-based invoice management tool built by Ainbae that helps you create, send, and track invoices effortlessly. Whether you're a freelancer or a small business owner, Invoxify streamlines your invoicing process with professional PDF invoice generation, automated email integration, payment reminders, draft saving, and revenue analytics.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Professional Invoice Creation:** Quickly design and generate sleek invoices customized with your logo and business details.
- **Email Integration:** Send invoices directly to your clients with PDF attachments for seamless communication.
- **Payment Reminders:** Send reminders to ensure you get paid on time.
- **Draft and Save:** Save unfinished invoices as drafts and finalize them when you're ready.
- **Revenue Analytics:** Monitor your total revenue with interactive graphs and charts.
- **Download Invoices:** Easily download your invoices as high-quality PDFs for offline access or record-keeping.

## Demo

Check out our live demo: [Invoxify Live](https://www.invoxify.com)

![](https://i.imgur.com/mFuuqks.gif)

## Getting Started

To get started with Invoxify, simply sign up for a free account and start managing your invoices in minutes!

## Installation

If you'd like to run Invoxify locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/invoxify.git
   cd invoxify
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```
3. **Create a `.env` file:**

   ```dotenv
   AUTH_SECRET=

   EMAIL_SERVER_USER=
   EMAIL_SERVER_PASSWORD=
   EMAIL_SERVER_HOST=
   EMAIL_SERVER_PORT=
   EMAIL_FROM=

   MAILTRAP_TOKEN=

   DATABASE_URL=

   AUTH_GITHUB_ID=
   AUTH_GITHUB_SECRET=

   AUTH_GOOGLE_ID=
   AUTH_GOOGLE_SECRET=

   AUTH_FACEBOOK_ID=
   AUTH_FACEBOOK_SECRET=

   AUTH_TRUST_HOST=true
   ```

   **Where to get these values:**

   - **AUTH_SECRET:** You can generate this via the official [Auth.js CLI](https://cli.authjs.dev/?_gl=1*1vgn0o7*_gcl_au*NjY2ODQ0MTIyLjE3MzYzMzExOTE.) running:

     ```bash
     npx auth secret
     ```

   - **EMAIL_SERVER\_\*:** These are provided by your email service provider. For development, consider using [Mailtrap](https://mailtrap.io/).

   - **MAILTRAP_TOKEN:** Available from your [Mailtrap](https://mailtrap.io/) account dashboard after signing up.
   - **DATABASE_URL:** Your database connection string – you can get this from [Neon.tech](https://neon.tech/).

   - **AUTH_GITHUB_ID** and **AUTH_GITHUB_SECRET:** Register your application in [GitHub Developer Settings](https://github.com/settings/developers).

   - **AUTH_GOOGLE_ID** and **AUTH_GOOGLE_SECRET:** Obtain these by registering your app on the [Google Developer Console](https://console.developers.google.com/).

   - **AUTH_FACEBOOK_ID** and **AUTH_FACEBOOK_SECRET:** Register your app on [Facebook for Developers](https://developers.facebook.com/).

4. **Connect your DataBase:** Connect your Neon Database with [Prisma](https://www.prisma.io/).

   ```bash
   npx prisma generate
   pnpm dlx prisma db push
   pnpm dlx prisma studio
   ```

5. **Start the development server:**

   ```bash
   pnpm run dev
   ```

6. **Open your browser and navigate to:**

   ```
   http://localhost:3000
   ```

_Adjust these instructions based on your actual tech stack and environment._

## Environment Variables

The application uses environment variables to manage configuration. Ensure you set them up in your `.env` file as shown above. This file is critical for:

- **Authentication and Security:** (`AUTH_SECRET`)
- **Email Service:** (`EMAIL_SERVER_USER`, `EMAIL_SERVER_PASSWORD`, `EMAIL_SERVER_HOST`, `EMAIL_SERVER_PORT`, `EMAIL_FROM`, `MAILTRAP_TOKEN`)
- **Database Connection:** (`DATABASE_URL` - Obtain from [Neon.tech](https://neon.tech/))
- **Social Authentication:** (`AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_FACEBOOK_ID`, `AUTH_FACEBOOK_SECRET`)
- **Trust Configuration:** (`AUTH_TRUST_HOST`)

## Usage

Once running, you can:

- Create new invoices using the dashboard.
- Customize and send invoices as professional PDFs.
- Monitor your invoicing and payment statuses.
- Analyze revenue with interactive graphs.

## Built With

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![ShadcnUI](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white) ![MagicUI](https://img.shields.io/badge/Magic%2Fui-CC83DF?style=for-the-badge&logo=magicui.design&logoColor=white) ![Mailtrap](https://img.shields.io/badge/Mailtrap-22D172?style=for-the-badge&logo=mailtrap&logoColor=white) ![Neon](https://img.shields.io/badge/neon-00DB9A?style=for-the-badge&logo=neontech&logoColor=white)

## Contributing

Contributions are welcome! If you'd like to contribute to Invoxify, please fork the repository and create a pull request. For major changes, please open an issue first to discuss what you would like to change.

See the [CONTRIBUTING.md](CONTRIBUTING.md) file for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For support or inquiries, please contact us at [info@ainbae.com](mailto:info@ainbae.com).

---

_Invoxify is a product by [Ainbae](https://www.ainbae.com/) – making invoicing simple so you can focus on growing your business!_
