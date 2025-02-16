import mongoose from "mongoose";

const InsightSchema = new mongoose.Schema(
  {
    url: { type: String, required: true, unique: true },
    domainName: { type: String, required: true },
    wordCount: { type: Number, required: true },
    favorite: { type: Boolean, default: false },
    webLinks: { type: [String], default: [] },
    mediaLinks: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Insight", InsightSchema);
