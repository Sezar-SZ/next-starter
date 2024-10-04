import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import Providers from "~/components/providers";

import Navbar from "../components/navbar/navbar";

export const metadata: Metadata = {
  title: "Next Starter",
  // icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${GeistSans.variable}`}
    >
      <body className="flex flex-col p-4">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
