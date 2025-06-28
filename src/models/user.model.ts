import mongoose, { Model, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  username: string;
  password?: string;
  name?: string;
  bio?: string;
  location?: string;
  profileImage?: string;
  coverImage?: string;
  isVerified: boolean;
  education?: [
    {
      institute: string;
      degree: string;
      image: string;
      startYear: string;
      endYear: string;
      gpa: string;
    }
  ];
  experience?: [
    {
      title: string;
      company: string;
      image: string;
      startYear: string;
      endYear: string;
      duration: string;
    }
  ];
  about?: string;
  authType?: string;
  role?: string;
  lastLogin: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email name is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      minlength: 8,
    },
    name: {
      type: String,
    },
    bio: {
      type: String,
      maxlength: [100, "Bio cannot exceed 100 characters"],
    },
    location: {
      type: String,
    },

    profileImage: {
      type: String,
    },
    coverImage: {
      type: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    education: [
      {
        institute: { type: String },
        degree: { type: String },
        image: { type: String },
        startYear: { type: String },
        endYear: { type: String },
        gpa: { type: String },
      },
    ],
    experience: [
      {
        title: { type: String },
        company: { type: String },
        image: { type: String },
        startYear: { type: String },
        endYear: { type: String },
        duration: { type: String },
      },
    ],
    about: {
      type: String,
      maxlength: [2000, "about cannot exceed 2000 characters"],
    },
    authType: { type: String, default: 'credentials' },
    role: { type: String, default: 'user' },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
