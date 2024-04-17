import mongoose, { Document, Schema } from "mongoose";

const usersSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

interface Users extends Document {
  username: string;
  password: string;
}

const usersModel = mongoose.model<Users>("users", usersSchema);

export default usersModel;
