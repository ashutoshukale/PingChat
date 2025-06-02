import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected Successfully : ${conn.connection.host}`);
  } catch (error) {
    console.log("An Error Occurred While Connecting to Database: ", error);
    process.exit(1);
  }
};
