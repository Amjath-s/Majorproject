import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  // Check if the password is being modified before hashing
  if (!this.isModified("password")) return next();

  try {
    // Hash the password asynchronously before saving
    this.password = await bcrypt.hash(this.password, 10);
    next(); // Proceed to save the user
  } catch (error) {
    return next(error); // If there's an error, pass it to the next middleware
  }
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
