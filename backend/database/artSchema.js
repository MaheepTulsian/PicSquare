import mongoose from "mongoose";

const artSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    image_url: {
      type: String,
      default: null,
    },
    is_premium: {
      type: Boolean,
      default: 0,
    },
    is_favourite: {
      type: Boolean,
      default: 0,
    },
    price: {
      type: String,
      default: 0,
    },
    author_first_name: {
      type: String,
      default: null,
    },
    author_last_name: {
      type: String,
      default: null,
    },
    author_avatar: {
      type: String,
      default: null,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Art = mongoose.model("Art", artSchema);
export default Art;
