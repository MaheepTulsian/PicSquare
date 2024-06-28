import mongoose from "mongoose";
const user = process.env.USER;
const password = process.env.PASSWORD;

const uri = `mongodb+srv://${user}:${password}@cluster0.zcooegm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectingDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      // Add this option if you're using a version of the MongoDB Node.js driver that requires it.
    });
    console.log("Database is connected");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};

connectingDatabase();

export default connectingDatabase;