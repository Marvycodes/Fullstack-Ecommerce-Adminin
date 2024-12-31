import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "userDB",
    });
    console.log("MongoDB is connected successfully");
  } catch (error) {
    console.log(error);
  }
};
