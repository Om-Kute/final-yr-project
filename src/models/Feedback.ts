import mongoose from "mongoose";

const FeedbackSchema =
    new mongoose.Schema(
        {
            userId: {
                type: String,
                required: true,
            },

            userName: {
                type: String,
                required: true,
            },

            projectPrompt: {
                type: String,
                required: true,
            },

            rating: {
                type: Number,
                required: true,
            },

            feedbackText: {
                type: String,
                required: true,
            },
        },

        {
            timestamps: true,
        }
    );

export default
    mongoose.models.Feedback ||
    mongoose.model(
        "Feedback",
        FeedbackSchema
    );