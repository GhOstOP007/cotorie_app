import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coterie",
  description: "A Next.js 14 Dev Community Social Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${nunito.className} bg-dark1 text-white`}>
          <Topbar />
          <main className="flex flex-grow">
            <LeftSidebar />
            <div className="flex min-h-screen flex-1 flex-col items-center bg-dark1 px-6 pb-10 pt-28 max-md:pb-32 sm:px-10">
              <div className="w-full max-w-4xl"> {children}</div>
            </div>
            <RightSidebar />
          </main>
          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
