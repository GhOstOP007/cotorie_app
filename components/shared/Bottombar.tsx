"use client";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Bottombar = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section className="fixed bottom-0 z-10 w-full rounded-t-3xl bg-[#101012]/60 p-4 backdrop-blur-lg xs:px-7 md:hidden">
      <div className="flex items-center justify-between gap-3 xs:gap-5">
        {sidebarLinks?.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`relative flex flex-col items-center gap-2 rounded-full p-2 sm:flex-1 sm:px-2 sm:py-2.5 hover:scale-[1.2] transition duration-150 ease-out ${
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
    </section>
  );
};

export default Bottombar;
