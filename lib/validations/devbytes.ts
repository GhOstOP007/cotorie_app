import * as z from "zod";

export const devbytesValidation = z.object({
  devbytes: z.string().nonempty().min(3).max(1000),
  accountId: z.string(),
});

export const CommentsValidation = z.object({
  devbytes: z.string().nonempty().min(3).max(1000),
  //accountId: z.string(),
});
