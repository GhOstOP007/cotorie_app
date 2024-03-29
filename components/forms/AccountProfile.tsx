"use client";

import React, { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import * as z from "zod";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/useUploadThing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

function AccountProfile({ user, btnTitle }: Props) {
  const [files, setFiles] = useState<File[]>([]);

  const { startUpload } = useUploadThing("media");

  const pathname = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image || "",
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
    },
  });

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";

        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].fileUrl) {
        values.profile_photo = imgRes[0].fileUrl;
      }
    }

    //upadte profile later
    await updateUser({
      userId: user.id,
      username: values.username,
      name: values.name,
      bio: values.bio,
      image: values.profile_photo,
      path: pathname,
    });

    if (pathname === "/profile/edit") {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="flex h-24 w-24 items-center justify-center rounded-full bg-dark2 !important">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile_photo"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  <div className="bg-black rounded-full p-4">
                    <FaUser size={96} />
                  </div>
                )}
              </FormLabel>
              <FormControl className="flex-1 text-md font-semibold text-gray-800">
                <Input
                  type="file"
                  accept="image/**"
                  placeholder="Upload a Profile Picture"
                  className="cursor-pointer border-none bg-transparent outline-none file:text-dark1 hover:underline !important"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-xl text-dark2 font-semibold">
                Name
              </FormLabel>
              <FormControl className="flex-1 text-lg font-semibold text-dark1">
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="border border-dark-4 bg-dark2 text-white focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-xl text-dark2 font-semibold">
                Username
              </FormLabel>
              <FormControl className="flex-1 text-sm font-semibold text-dark1">
                <Input
                  type="text"
                  placeholder="Your Username"
                  className="border border-dark-4 bg-dark2 text-white focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-xl text-dark2 font-semibold">
                Bio
              </FormLabel>
              <FormControl className="flex-1 text-sm font-semibold text-dark1">
                <Textarea
                  rows={10}
                  placeholder="Your Bio"
                  className="border border-dark-4 bg-dark2 text-white  focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="text-md hover:scale-[1.1] " type="submit">
          {btnTitle}
        </Button>
      </form>
    </Form>
  );
}

export default AccountProfile;
