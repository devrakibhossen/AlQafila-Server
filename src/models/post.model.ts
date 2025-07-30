import mongoose, { Model, Schema, Document } from "mongoose";

export interface IMediaImage {
  type: "image";
  images: string[];
}

export interface IMediaVideo {
  type: "video";
  video: string;
}
export interface IReactions {
  like: number;
  love: number;
  smart: number;
  funny: number;
  wow: number;
  sad: number;
  angry: number;
  total: number;
}
export enum ProfileStatus {
  Follow = "follow",
  Following = "following",
  Request = "request",
  Requested = "requested",
  Unfollowed = "unfollowed",
}
export interface IPost extends Document {
  authorId: mongoose.Types.ObjectId;
  text: string;
  hashtags?: string[];
  reactions?: IReactions;
  shares?: number;
  images?: IMediaImage[];
  video?: IMediaVideo;
  createdAt?: Date;
  updatedAt?: Date;
  reportedBy?: string[];
  reactionsBy?: string[];
  profileStatus: ProfileStatus;
  views: number;
}

const postSchema: Schema<IPost> = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: { type: String, required: true },
    hashtags: [{ type: String }],
    reactions: {
      like: { type: Number, default: 0 },
      love: { type: Number, default: 0 },
      smart: { type: Number, default: 0 },
      funny: { type: Number, default: 0 },
      wow: { type: Number, default: 0 },
      sad: { type: Number, default: 0 },
      angry: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },
    shares: { type: Number, default: 0 },
    images: [
      {
        type: {
          type: String,
          enum: ["image"],
          default: "image",
        },
        images: {
          type: String,
          required: true,
        },
      },
    ],
    video: {
      type: {
        type: String,
        enum: ["video"],
        default: "video",
      },
      video: String,
    },
    reportedBy: [{ type: String }],
    reactionsBy: [{ type: String }],
    profileStatus: {
      type: String,
      enum: Object.values(ProfileStatus),
      default: ProfileStatus.Request,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post: Model<IPost> = mongoose.model<IPost>("Post", postSchema);
export default Post;
