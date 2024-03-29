"use server";
import { connectDB } from "../mongoose";
import DevByte from "../models/thread.model";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { string } from "zod";

interface Props {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  connectDB();

  const skipAmount = (pageNumber - 1) * pageSize;

  const postQuery = DevByte.find({
    parentId: { $in: [null, undefined] },
  })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  const totalPostsCount = await DevByte.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  const posts = await postQuery.exec();

  const isNext = totalPostsCount > skipAmount + posts.length;

  return { posts, isNext };
}

const createDevBytes = async ({ text, author, communityId, path }: Props) => {
  try {
    connectDB();

    const createdDevByte = await DevByte.create({
      text,
      author,
      community: null,
    });

    await User.findByIdAndUpdate(author, {
      $push: { devbytes: createdDevByte._id },
    });
  } catch (error) {
    throw new Error(`Error Creating Thread : ${error}`);
  }

  revalidatePath(path);
};

export async function fetchDevbyteById(id: string) {
  connectDB();

  try {
    //to do: popoluate communiuth

    const devbyte = await DevByte.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentid image",
          },
          {
            path: "children",
            model: DevByte,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentid image",
            },
          },
        ],
      })
      .exec();

    return devbyte;
  } catch (error: any) {
    throw new Error(`Error fetching devbyte : ${error.message}`);
  }
}

export async function addCommentToDevbyte(
  devbyteId: string,
  commentText: string,
  userId: string,
  path: string
) {
  try {
    //adding a comment
    //find original byte by id

    const originalDevbyte = await DevByte.findById(devbyteId);

    if (!originalDevbyte) {
      throw new Error("Devbyte not found1");
    }

    const commentDevbyte = new DevByte({
      text: commentText,
      author: userId,
      parentId: devbyteId,
    });

    //save

    const savedCommentDevbyte = await commentDevbyte.save();

    originalDevbyte.children.push(savedCommentDevbyte._id);

    await originalDevbyte.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Error adding comment to devbyte : ${error.message}`);
  }
}

export default createDevBytes;
