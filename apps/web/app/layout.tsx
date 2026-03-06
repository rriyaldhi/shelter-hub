import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shelter Hub — Shelter Operations, Simplified",
  description:
    "Shelter Hub replaces fragmented spreadsheets and messaging apps with a single platform built for animal shelters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
