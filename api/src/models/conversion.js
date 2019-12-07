import mongoose from "mongoose";

const conversionSchema = new mongoose.Schema({
  code: String,
  message: String
});

const conversion = mongoose.model("Conversion", conversionSchema);

export default conversion;
