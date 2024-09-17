import mongoose from "mongoose";

export const DBConnection = async () => {
    try {
        mongoose.set("strictQuery", true);
        let connect = false;

        if (connect) return;
        connect = true;

        const locale = process.env.DATABASE_URL!;
        const online = process.env.DATABASE_URI!;

        await mongoose.connect(locale || online, { serverSelectionTimeoutMS: 3e6 });
    } catch (error: any) {
        console.log(error.message);
    }
};
