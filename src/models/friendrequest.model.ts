import mongoose, { Model, Schema, Document } from "mongoose";

interface IFriendRequest extends Document {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  status: "pending" | "accepted" | "rejected";
  createdAt?: Date;
}

const friendRequestSchema: Schema<IFriendRequest> = new mongoose.Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const FriendRequest: Model<IFriendRequest> = mongoose.model<IFriendRequest>(
  "FriendRequest",
  friendRequestSchema
);
export default FriendRequest;
