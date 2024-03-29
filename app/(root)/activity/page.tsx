import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser, fetchUsers, getActivity } from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";
import Link from "next/link";
import Image from "next/image";

const page = async () => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  //getactivity
  const activity = await getActivity(userInfo._id);

  return (
    <section>
      <h1 className="text-4xl font-bold text-white mb-10">Activity</h1>
      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity.map((act) => (
              <Link key={act._id} href={`/devbyte/${act.parentId}`}>
                <article className="flex items-center gap-2 rounded-md bg-dark2 px-7 py-4">
                  <Image
                    src={act.author.image}
                    alt="profile pic"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <p>
                    <span className="mr-1 text-bright2 underline">
                      {act.author.name}
                    </span>{" "}
                    replied to your devbyte!
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className="text-white">No Activity yet</p>
        )}
      </section>
    </section>
  );
};

export default page;
