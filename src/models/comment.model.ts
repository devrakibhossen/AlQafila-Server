import mongoose, { Model, Schema, Document } from "mongoose";

export interface IComment extends Document {
  postId: mongoose.Types.ObjectId;
  content: string;
  authorId: mongoose.Types.ObjectId;
  parentId?: mongoose.Types.ObjectId | null;
}

const commentSchema: Schema<IComment> = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
  },
  { timestamps: true }
);

const Comment: Model<IComment> = mongoose.model<IComment>(
  "comment",
  commentSchema
);
export default Comment;
