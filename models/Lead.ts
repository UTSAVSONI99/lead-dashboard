import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    status: {
      type: String,
      enum: ["New", "Contacted", "Converted", "Lost"],
      default: "New",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
