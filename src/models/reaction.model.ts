import mongoose, { Model, Schema } from "mongoose";

export interface IReaction extends Document {
  postId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  type: "like" | "love" | "funny" | "wow" | "sad" | "angry";
}

const reactionSchema: Schema<IReaction> = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["like", "love", "funny", "wow", "sad", "angry"],
      required: true,
    },
  },
  { timestamps: true }
);

reactionSchema.index({ postId: 1, userId: 1 }, { unique: true });

const Reaction: Model<IReaction> = mongoose.model<IReaction>(
  "Reaction",
  reactionSchema
);

export default Reaction;
