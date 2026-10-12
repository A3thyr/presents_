import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/public/styles/globals.css";
// import Script from "next/script";
import { AppProvider } from "@/shared/providers/provider";
import { getMessages } from "next-intl/server";
import PageLayout from "@/shared/layouts/page.layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stonks Gifts",
  description: "",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();
  
  return (
    <html
      lang={locale}
      suppressHydrationWarning={true} //костыль, проверить при разработке в тма
    >
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js" defer />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider locale={locale} messages={messages}>
          <PageLayout>{children}</PageLayout>
        </AppProvider>
      </body>
    </html>
  );
}
