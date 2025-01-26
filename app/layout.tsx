import type { Metadata } from "next";
import "./app.css";

export const metadata: Metadata = {
  title: "API Responder",
  description: "Responding to your requests",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
