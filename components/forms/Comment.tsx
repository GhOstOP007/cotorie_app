"use client";

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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";

import { Input } from "../ui/input";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import { CommentsValidation } from "@/lib/validations/devbytes";
import { addCommentToDevbyte } from "@/lib/actions/devbytes.actions";
//import createDevBytes from "@/lib/actions/devbytes.actions";

interface Props {
  devbyteId: string;
  currentUserId: string;
  currentUserImg: string;
}

function Comment({ devbyteId, currentUserId, currentUserImg }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(CommentsValidation),
    defaultValues: {
      devbytes: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentsValidation>) => {
    await addCommentToDevbyte(
      devbyteId,
      values.devbytes,
      JSON.parse(currentUserId),
      pathname
    );
    //find original byte by id);

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex items-center gap-4 border-y border-y-dark1 py-5 max-xs:flex-col"
      >
        <FormField
          control={form.control}
          name="devbytes"
          render={({ field }) => (
            <FormItem className="flex gap-3 items-center w-full">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="profile img"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="Comment"
                  {...field}
                  className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 text-gray-300 outline-none"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="rounded-3xl bg-zinc-500 px-8 py-2 max-xs:w-full hover:scale-[1.1] transiton ease-in-out duration-300 text-dark1 hover:text-white text-lg"
        >
          Reply
        </Button>
      </form>
    </Form>
  );
}

export default Comment;
