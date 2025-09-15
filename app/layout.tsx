import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "@/shared/components";

export const metadata: Metadata = {
  title: "Chiel Bleyenbergh - FE Challenge",
  description:
    "Create an interface where the user can see, filter and inspect logs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="flex flex-col gap-20 p-4 max-w-2k m-auto">
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
