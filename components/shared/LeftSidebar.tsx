"use client";
import Link from "next/link";
import React, { useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { sidebarLinks } from "@/constants/index";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import { HiOutlineLogout } from "react-icons/hi";
import Image from "next/image";

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();
  return (
    <section className="custom-scrollbar sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r border-r-dark-4 bg-dark2 pb-5 pt-28 max-md:hidden">
      <div className="flex w-full flex-1 flex-col gap-6 px-6 text-lg">
        {sidebarLinks?.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === "/profile") link.route = `${link.route}/${userId}`;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`relative flex justify-start gap-4 rounded-lg p-4 hover:scale-[1.2] transition duration-150 ease-out ${
                isActive ? "active" : "hover:bg-bright1"
              }`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                height={24}
                width={24}
              />
              <p className="font-semibold max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex cursor-pointer gap-4 hover:bg-gray-300 hover:text-rose-700 p-4 rounded-full font-semibold hover:scale-[1.2] transition duration-200 ease-in-out">
              <HiOutlineLogout size={24} />
              <p className="max-lg:hidden pl-4">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
