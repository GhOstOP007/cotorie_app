import { UserButton, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { motion } from "framer-motion";
import { fetchPosts } from "@/lib/actions/devbytes.actions";
import DevByteCard from "@/components/cards/DevByteCard";

export default async function Home() {
  const user = await currentUser();
  const result = await fetchPosts(1, 30);

  return (
    <>
      <h1 className="text-4xl font-semibold">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="text-center text-4xl text-bright2">
            No DevBytes found!
          </p>
        ) : (
          <>
            {result.posts.map((post) => (
              <DevByteCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id || ""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
                isComment={false}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}

{
  /*<motion.div
        initial={{
          y: 0,
        }}
        animate={{
          y: -2000,
        }}
        transition={{
          duration: 2.5,
          delay: 2,
          type: "spring",
        }}
        className="z-[500] flex flex-col justify-center items-center absolute bg-gray-900 h-screen w-full space-y-2"
      >
        <motion.p
          initial={{
            y: +50,
            opacity: 0,
          }}
          animate={{ y: 0, opacity: 1, type: "spring" }}
          transition={{
            delay: 0.5,
            duration: 1,
            type: "spring",
          }}
          className="text-4xl font-semibold"
        >
          Ishan Vishwakarma
        </motion.p>
        <motion.span
          initial={{
            y: +50,
            opacity: 0,
          }}
          animate={{ y: 0, opacity: 1, type: "spring" }}
          transition={{
            delay: 0.5,
            duration: 1,
          }}
          className="text-2xl"
        >
          ©️ Folio 2024
        </motion.span>
        </motion.div>*/
}
