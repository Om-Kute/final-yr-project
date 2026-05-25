import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {

    userId: {
      type: String,
      required: false,
    },
    userMessage: {
      type: String,
      required: true,
    },

    aiReply: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.models.Chat ||
  mongoose.model("Chat", ChatSchema);