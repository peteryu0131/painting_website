import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Northline Finish Co. | Painting, Renovation, Training",
  description:
    "Professional wall painting, renovation, restoration, and hands-on painter training for homes, businesses, and future painters.",
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
