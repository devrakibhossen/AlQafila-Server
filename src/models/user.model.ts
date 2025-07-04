import mongoose, { Model, Schema, Types } from "mongoose";

interface IEducation extends Document {
  institute: string;
  degree: string;
  image: string;
  startYear: string;
  endYear: string;
  gpa: string;
}

interface IExperience extends Document {
  title: string;
  company: string;
  image: string;
  startYear: string;
  endYear: string;
  duration: string;
}

export interface IUser extends Document {
  email: string;
  username: string;
  password?: string;
  name?: string;
  bio?: string;
  locations?: string;
  profileImage?: string;
  coverImage?: string;
  isVerified: boolean;
  education: Types.DocumentArray<IEducation>;
  experience: Types.DocumentArray<IExperience>;
  about?: string;
  authType?: string;
  role?: string;
  follower: number;
  following: number;
  friend: number;
  lastLogin: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// === Subdocument Schemas ===

const EducationSchema = new Schema<IEducation>(
  {
    institute: { type: String },
    degree: { type: String },
    image: { type: String },
    startYear: { type: String },
    endYear: { type: String },
    gpa: { type: String },
  },
  { _id: true }
);

const ExperienceSchema = new Schema<IExperience>(
  {
    title: { type: String },
    company: { type: String },
    image: { type: String },
    startYear: { type: String },
    endYear: { type: String },
    duration: { type: String },
  },
  { _id: true }
);

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
    locations: {
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
    education: [EducationSchema],
    experience: [ExperienceSchema],
    about: {
      type: String,
      maxlength: [2000, "about cannot exceed 2000 characters"],
    },
    authType: { type: String, default: "credentials" },
    role: { type: String, default: "user" },
    follower: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    friend: { type: Number, default: 0 },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
