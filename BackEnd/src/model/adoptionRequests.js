import mongoose from "mongoose";
const adoptionRequestSchema = new mongoose.Schema(
  {
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true
    },

    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export const AdoptionRequests= mongoose.model(
  "AdoptionRequests",
  adoptionRequestSchema
);
