"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
}

const UserCard = ({ id, name, username, imgUrl, personType }: Props) => {
  const router = useRouter();
  return (
    <article className="flex flex-col justify-between gap-4 xs:flex-row xs:items-center">
      <div className="flex flex-1 items-start justify-start gap-3 xs:items-center">
        <Image
          src={imgUrl}
          alt="logo"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className="flex-1 text-ellipsis">
          <h4 className="text-bold">{name}</h4>
          <p className="text-xs">@{username}</p>
        </div>
        <Button
          onClick={() => router.push(`/profile/${id}`)}
          className="h-auto min-w-[74px] rounded-lg bg-white text-[12px] hover:text-white trasnition duration-150 text-dark2"
        >
          View
        </Button>
      </div>
    </article>
  );
};

export default UserCard;
