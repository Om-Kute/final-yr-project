import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    prompt: {
      type: String,
      required: true,
    },

    projectTitle: {
      type: String,
      required: true,
    },

    techStack: {
      type: [String],
      default: [],
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.models.Project ||
  mongoose.model(
    "Project",
    ProjectSchema
  );