import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SatsFI",
  description: "Created by Brownzini",
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
