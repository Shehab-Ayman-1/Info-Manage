import mongoose from "mongoose";
let connect = false;

export const DBConnection = async () => {
    try {
        mongoose.set("strictQuery", true);
        if (connect) return;

        const local = process.env.DATABASE_URI;
        const online = process.env.DATABASE_URI;
        await mongoose.connect(local! || online!, { serverSelectionTimeoutMS: 3e6 });

        connect = true;
    } catch (error: any) {
        console.log(error.message);
    }
};
