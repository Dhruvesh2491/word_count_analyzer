import mongoose from "mongoose";
const uri=process.env.MONGO_URI

const connectDB = () => {
  mongoose
    .connect(uri, { dbName: "Word_count" })
    .then((data) => {
      console.log("Connected to Database");
    })
    .catch((error) => {
      throw error;
    });
};
export default connectDB;
