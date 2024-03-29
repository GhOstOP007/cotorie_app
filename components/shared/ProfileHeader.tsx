"use client";

import Image from "next/image";
import React from "react";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
}

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
}: Props) => {
  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative border-[3px] rounded-full h-20 w-20 object-cover">
            <Image
              src={imgUrl}
              fill
              alt="profile image"
              className="rounded-full object-cover shadow-md p-1"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-left text-3xl font-bold">{name}</h2>
            <p className="text-zinc-300 font-semibold text-lg">@{username}</p>
          </div>
        </div>
      </div>

      {/** to do community */}

      <p className="mt-6 max-w-lg text-bright2">{bio}</p>
      <div className="mt-12 h-0.5 w-full bg-dark2" />
    </div>
  );
};

export default ProfileHeader;
