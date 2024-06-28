import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    age: {
      type: Number,
      default: 18,
    },
  },
  {
    timestamps: true,
  }
);

const Test = mongoose.model("Test", testSchema);
export default Test;
