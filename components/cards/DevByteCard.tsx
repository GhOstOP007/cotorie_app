import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

const DevByteCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: Props) => {
  return (
    <article
      className={`flex w-full flex-col rounded-xl
    ${isComment ? "px-0 xs:px-7" : "bg-dark2 p-7 "}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile Image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>
            <div className="relative mt-2 w-0.5 grow rounded-full bg-white/50" />
          </div>
          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer font-semibold text-white">
                {author.name}
              </h4>
            </Link>
            <p className="mt-2 text-md text-gray-100">{content}</p>
            <div className={`${isComment && 'mb-10'} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <Image
                  src="/assets/heart.svg"
                  alt="like"
                  height={24}
                  width={24}
                  className="cursor-pointer"
                />
                <Link href={`/devbyte/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    height={32}
                    width={32}
                    className="cursor-pointer"
                  />
                </Link>
                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  height={32}
                  width={32}
                  className="cursor-pointer"
                />
                <Image
                  src="/assets/share.svg"
                  alt="share"
                  height={32}
                  width={32}
                  className="cursor-pointer"
                />
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/devbyte/${id}`}>
                  <p className="mt-1 text-xs font-medium">
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default DevByteCard;
