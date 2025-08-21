import mongoose, { Model, Schema, Document } from "mongoose";
import slugify from "slugify";
import { transliterate } from 'transliteration';

export interface IMediaImage {
  type: "image";
  images: string[];
}

export interface IMediaVideo {
  type: "video";
  video: string;
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
  slug: string;
  hashtags?: string[];
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
    slug: { type: String, unique: true },
    hashtags: [{ type: String }],
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

postSchema.pre("save", function (next) {
  if (this.isModified("text") || !this.slug) {
    const transliteratedText = transliterate(this.text || '');

    let baseSlug = slugify(transliteratedText, {
      lower: true,
      strict: true,
      locale: 'en',
      trim: true,
    });

    if (!baseSlug) baseSlug = 'post';

    if (baseSlug.length > 50) {
      baseSlug = baseSlug.substring(0, 50).replace(/-+$/, '');
    }

    const id = this._id as mongoose.Types.ObjectId;
    this.slug = `${baseSlug}-${id.toString().slice(-6)}`;
  }
  next();
});



const Post: Model<IPost> = mongoose.model<IPost>("Post", postSchema);
export default Post;
