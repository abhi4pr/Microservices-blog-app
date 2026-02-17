import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: "microdb",
    });
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
};

export default connectDb;
