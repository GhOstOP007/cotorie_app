import DevByteCard from "@/components/cards/DevByteCard";
import Comment from "@/components/forms/Comment";
import { fetchDevbyteById } from "@/lib/actions/devbytes.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params }: Props) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const devbyte = await fetchDevbyteById(params.id);

  return (
    <section className="relative">
      <div>
        <DevByteCard
          key={devbyte._id}
          id={devbyte._id}
          currentUserId={user?.id || ""}
          parentId={devbyte.parentId}
          content={devbyte.text}
          author={devbyte.author}
          community={devbyte.community}
          createdAt={devbyte.createdAt}
          comments={devbyte.children}
          isComment={false}
        />
      </div>
      <div className="mt-7">
        <Comment
          devbyteId={devbyte.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>
      <div className="mt-10 space-y-4">
        {devbyte.children.map((childItem: any) => (
          <DevByteCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={childItem?.id || ""}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment={true}
          />
        ))}
      </div>
    </section>
  );
};

export default page;
