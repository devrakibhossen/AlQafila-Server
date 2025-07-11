import mongoose, { Model, Schema, Document } from "mongoose";

interface IFollow extends Document {
  follower: mongoose.Types.ObjectId;
  following: mongoose.Types.ObjectId;
  createdAt?: Date;
}

const followSchema: Schema<IFollow> = new mongoose.Schema(
  {
    follower: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    following: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Follow: Model<IFollow> = mongoose.model<IFollow>("Follow", followSchema);
export default Follow;
