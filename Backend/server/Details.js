import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const personalDetailsSchema = new mongoose.Schema({
  name: String,
  dob: String,
  age: Number,
  email: String,
  phone: String,
});

const PersonalDetails = mongoose.model(
  "PersonalDetails",
  personalDetailsSchema
);
export default PersonalDetails;
