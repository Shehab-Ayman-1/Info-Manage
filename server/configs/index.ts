import mongoose from "mongoose";

let connect = false;

export const DBConnection = async () => {
    try {
        mongoose.set("strictQuery", true);

        if (connect) return;
        const URL = process.env.DATABASE_URI! || process.env.DATABASE_URI!;

        // Increase timeout to 30 seconds
        await mongoose.connect(URL, { serverSelectionTimeoutMS: 30000 });

        connect = true;
    } catch (error: any) {
        console.log(error.message);
    }
};
