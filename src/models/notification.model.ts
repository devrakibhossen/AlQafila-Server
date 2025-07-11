import mongoose, { Schema, Document, Model } from "mongoose";

export type NotificationType = "follow" | "friend_request" | "like" | "comment";

interface INotification extends Document {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  type: NotificationType;
  message: string;
  isRead: boolean;
  createdAt?: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["follow", "friend_request", "like", "comment"],
      required: true,
    },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification: Model<INotification> = mongoose.model(
  "Notification",
  notificationSchema
);

export default Notification;
