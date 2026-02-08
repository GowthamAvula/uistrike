"use client";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { TamboV1Provider } from "@tambo-ai/react/v1";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} antialiased`}
      >
        <MantineProvider defaultColorScheme="dark">
          <TamboV1Provider
            apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
            userKey="default-user"
          >
            {children}
          </TamboV1Provider>
        </MantineProvider>
      </body>
    </html>
  );
}
