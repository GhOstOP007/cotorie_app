"use client";
import { OrganizationSwitcher, SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { dark } from "@clerk/themes";
import { motion } from "framer-motion";

const Topbar = () => {
  const router = useRouter();
  const isUserLoggedIn = true;
  return (
    <nav className="fixed top-0 z-30 flex w-full items-center justify-between bg-dark2 px-6 py-3">
      <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Link href="/" className="flex items-center gap-4">
          <Image src="/logo.png" alt="logo" width="64" height="64" />
          <p className="text-3xl font-bold text-bright2 max-sm:hidden">
            Coterie
          </p>
        </Link>
      </motion.div>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton signOutCallback={() => router.push("/sign-in")}>
              <div className="flex cursor-pointer hover:bg-bright1 p-1 rounded-full">
                <HiOutlineLogout size={24} />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "px-4 py-2",
            },
          }}
        />
      </div>
    </nav>
  );
};

export default Topbar;
