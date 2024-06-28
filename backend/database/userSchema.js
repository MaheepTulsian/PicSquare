import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      default: null,
      
    },
    last_name: {
      type: String,
      default: null,
      
    },
    email: {
      type: String,
      default: null,
      
    },
    password: {
      type: String,
      default: null,
      
    },
    avatar_url: {
      type: String,
      default: null,
      
    },
    bio: {
      type: String,
      default: null,
      
    },
    instagram: {
      type: String,
      default: null,
      
    },
    website: {
      type: String,
      default: null,
      
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Art",
      }
    ],
    my_creations: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Art",
        }
    ],
    purchases: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Art",
      }
    ]
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;