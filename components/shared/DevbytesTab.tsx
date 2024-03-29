import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";
import DevByteCard from "../cards/DevByteCard";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const DevbytesTab = async ({
  currentUserId,
  accountType,
  accountId,
}: Props) => {
  let result = await fetchUserPosts(accountId);

  if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.devbytes.map((devbyte: any) => (
        <DevByteCard
          key={devbyte._id}
          id={devbyte._id}
          currentUserId={currentUserId}
          parentId={devbyte.parentId}
          content={devbyte.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: devbyte.author.name,
                  image: devbyte.auhtor.image,
                  id: devbyte.auhtor.id,
                }
          } // todo
          community={devbyte.community} //todo
          createdAt={devbyte.createdAt}
          comments={devbyte.children}
        />
      ))}
    </section>
  );
};

export default DevbytesTab;
