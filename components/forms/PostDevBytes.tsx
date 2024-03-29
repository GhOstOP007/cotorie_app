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

import { Textarea } from "../ui/textarea";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import { devbytesValidation } from "@/lib/validations/devbytes";
import createDevBytes from "@/lib/actions/devbytes.actions";

type Props = {
  userId: string;
};

const PostDevBytes = ({ userId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(devbytesValidation),
    defaultValues: {
      devbytes: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof devbytesValidation>) => {
    await createDevBytes({
      text: values.devbytes,
      author: userId,
      communityId: null,
      path: pathname,
    });

    router.push("/");
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10 mt-10"
      >
        <FormField
          control={form.control}
          name="devbytes"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3 w-full">
              <FormLabel className="text-xl text-bright2 font-semibold">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark1 bg-dark2 text-white text-md">
                <Textarea rows={12} placeholder="Your DevBytes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-bright1 text-lg">
          Post DevByte
        </Button>
      </form>
    </Form>
  );
};

export default PostDevBytes;
