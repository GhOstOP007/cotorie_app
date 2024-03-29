import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import { Nunito } from "next/font/google";
import Image from "next/image";

export const metadata = {
  title: "Coterie",
  description: "A Next.js 14 Dev Community Social Application",
};

const nunito = Nunito({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${nunito.className} bg-[#092634] text-white`}>
          <div className="w-full flex flex-col gap-10 justify-center items-center min-h-screen">
            <div className="flex justify-center items-center">
              <Image src="/logo.png" alt="logo" width="64" height="64" />
              <p className="text-4xl font-bold text-bright2 max-sm:hidden">
                Coterie
              </p>
            </div>
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
