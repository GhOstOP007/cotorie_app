import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
import DevbytesTab from "@/components/shared/DevbytesTab";

const page = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(params.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />
      <div className="mt-9">
        <Tabs defaultValue="devbytes" className="w-full">
          <TabsList className="flex min-h-[50px] flex-1 items-center gap-3 bg-dark2 data-[state=active]:bg-[#0e0e12] data-[state=active]:text-bright2">
            {profileTabs.map((tab) => (
              <TabsTrigger
                key={tab.label}
                value={tab.value}
                className="flex min-h-[50px] flex-1 text-white font-semibold text-md items-center gap-3 bg-dark2 data-[state=active]:bg-gray-900 data-[state=active]:text-bright2"
              >
                <Image src={tab.icon} alt={tab.label} width={24} height={24} />
                <p className="max-sm:hidden">{tab.label}</p>

                {tab.label === "DevBytes" && (
                  <p className="ml-1 rounded-sm bg-green-600 px-2 py-1 text-sm text-black">
                    {userInfo?.devbytes?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className="w-full text-bright2"
            >
              <DevbytesTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType="User"
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default page;
