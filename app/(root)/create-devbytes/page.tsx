import React from "react";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import PostDevBytes from "@/components/forms/PostDevBytes";

type Props = {};

const page = async (props: Props) => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="text-4xl font-semibold">Create-devbytes</h1>
      <PostDevBytes userId={userInfo._id} />
    </>
  );
};

export default page;
