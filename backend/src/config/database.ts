import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined");
    }

    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB Connected successfully");
  } catch (error: any) {
    console.log("❌ MongoDB connection failed", error.message);
    process.exit(1);
  }
};
