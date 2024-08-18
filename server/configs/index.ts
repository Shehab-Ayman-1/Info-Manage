import mongoose from "mongoose";
let connect = false;

export const DBConnection = async (forceConnectToOnline: boolean = false) => {
    try {
        mongoose.set("strictQuery", true);

        if (connect) return;
        const locale = process.env.DATABASE_URL!;
        const online = process.env.DATABASE_URI!;
        const URL = forceConnectToOnline ? online : locale || online;

        // Increase timeout to 30 seconds
        await mongoose.connect(URL, { serverSelectionTimeoutMS: 3000000 });

        connect = true;
        console.log("DB Connected");
    } catch (error: any) {
        console.log(error.message);
    }
};
