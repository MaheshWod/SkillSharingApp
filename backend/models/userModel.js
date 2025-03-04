

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            required: true,
        },
        role: {
            type: Number,
            default: 0, // Default role is 0 (user)
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
