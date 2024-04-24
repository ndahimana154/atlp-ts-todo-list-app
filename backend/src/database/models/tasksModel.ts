import mongoose, { Document, Schema } from "mongoose";

const tasksSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

interface Tasks extends Document {
  title: string;
  description: string;
  isCompleted: boolean;
}

const tasksModel = mongoose.model<Tasks>("tasks", tasksSchema);

export default tasksModel;
