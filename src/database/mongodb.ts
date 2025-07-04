import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

const connectToDatabase = async (): Promise<void> => {
  try {
    if (!DB_URI) {
      throw new Error(
        "Please define the mongodb uri environment variable inside .env .local"
      );
    }
    await mongoose.connect(DB_URI);
    console.log(`Connected to database in ${NODE_ENV} mode`);
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1);
  }
};

export default connectToDatabase;
