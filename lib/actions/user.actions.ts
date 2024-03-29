"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectDB } from "../mongoose";
import DevByte from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: Params): Promise<void> {
  connectDB();

  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path == "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error) {
    console.log(`Failed to create/update user : ${error}`);
  }
}

export async function fetchUser(userId: string) {
  try {
    connectDB();

    return await User.findOne({ id: userId });
    //.populate({
    //  path:'communities',
    //  model : Community,
    // })
  } catch (error) {
    throw new Error(`Failed to fetch user : ${error}`);
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    connectDB();

    //to do populate commjniyt
    //find all threadsd authored by user with thr givrn userID

    const devbytes = await User.findOne({ id: userId }).populate({
      path: "devbytes",
      model: DevByte,
      populate: {
        path: "children",
        model: DevByte,
        populate: {
          path: "author",
          model: User,
          select: "name image id",
        },
      },
    });
    return devbytes;
  } catch (error: any) {
    throw new Error(`Failed to fetch user : ${error.message}`);
  }
}

export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };

    if (searchString.trim()! == "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }

    const sortOptions = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalUserCount = await User.countDocuments(query);

    const users = await usersQuery.exec();

    const isNext = totalUserCount > skipAmount + users.length;

    return { users, isNext };
  } catch (error: any) {
    throw new Error(`Failed to fetch user : ${error.message}`);
  }
}

export async function getActivity(userId: string) {
  try {
    connectDB();

    //find all threads
    const userDevbytes = await DevByte.find({ author: userId });

    if (!userDevbytes || userDevbytes.length === 0) {
      // No threads found, return an empty array
      return [];
    }

    //collet all the child
    const childDevbyteIds = userDevbytes.reduce((acc, userDevbyte) => {
      return acc.concat(userDevbyte.children || []);
    }, []);

    const replies = await DevByte.find({
      _id: { $in: childDevbyteIds },
      author: { $ne: userId },
    }).populate({
      path: "author",
      model: User,
      select: "name image _id",
    });
    return replies;
  } catch (error: any) {
    throw new Error(`Failed to fetch user : ${error.message}`);
  }
}
