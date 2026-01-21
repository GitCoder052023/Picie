import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Picie | Intelligent Legal Assistant",
  description: "Picie makes the web's fine print digestible. An open-source browser extension using Google's Gemini AI to summarize Terms & Conditions and handle Cookie Consents.",
  keywords: ["Picie", "Legal Assistant", "Gemini AI", "Terms and Conditions", "Privacy Policy", "Cookie Consent", "Browser Extension"],
  authors: [{ name: "GitCoder052023" }],
  openGraph: {
    title: "Picie | Intelligent Legal Assistant",
    description: "Summarize complex Terms & Conditions and handle cookies intelligently with Picie.",
    type: "website",
    url: "https://picie.vercel.app", // Placeholder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary/30 selection:text-primary`}
      >
        {children}
      </body>
    </html>
  );
}
