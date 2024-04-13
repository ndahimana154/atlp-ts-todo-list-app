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
  },
  { timestamps: true }
);

interface Tasks extends Document {
  title: string;
  description: string;
}

const tasksModel = mongoose.model<Tasks>("tasks", tasksSchema);

export default tasksModel;
