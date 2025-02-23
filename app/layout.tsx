import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beastgames-gpt.vercel.app"),
  title: "BeastGamesGPT",
  description:
    "BeastGamesGPT is a chatbot that can explore about the beastgames series on amazon-prime",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/beast.jpeg",
  },
  openGraph: {
    title: "BeastGamesGPT",
    description:
      "BeastGamesGPT is a chatbot that can explore about the beastgames series on amazon-prime",
    images: [
      {
        url: "/og.png",
        alt: "BeastGamesGPT",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BeastGamesGPT",
    description:
      "BeastGamesGPT is a chatbot that can explore about the beastgames series on amazon-prime",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <SidebarProvider
          style={
            {
              "--sidebar-width": "300px",
              "--sidebar-width-mobile": "300px",
            } as React.CSSProperties
          }
        >
          <Toaster position="top-center" richColors theme="dark" />
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
