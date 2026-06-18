import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/nav/AppShell";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MoodPilot — Your AI communication companion",
  description:
    "MoodPilot helps you understand emotionally complex messages and craft better replies. Communication support only — not therapy, not diagnosis.",
  keywords: [
    "AI communication",
    "emotional intelligence",
    "message assistant",
    "reply drafting",
    "product portfolio",
  ],
  openGraph: {
    title: "MoodPilot — Your AI communication companion",
    description:
      "Understand the message. Choose your words. Stay in control.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${fraunces.variable}`}>
      <body className="font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
