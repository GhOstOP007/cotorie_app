import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
    mongoose.set('strictQuery',true);

    if(!process.env.MONGODB_URL) return console.log("MONGODB not found");

    if(isConnected) return console.log("Already Connected to MongoDB");

    try {
        await mongoose.connect(process.env.MONGODB_URL)

        isConnected = true;

        console.log("Connected to MONGO_DB!")

    } catch (error) {
        console.log(error);
    }
}