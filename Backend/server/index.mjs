
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// // import authRoutes from "authRoutes.js"
// import express from "express"
// import router from "./authRoute.mjs";

// dotenv.config();


// const app=express();

// app.use(cors());
// app.use(express.json());

// //Routing 

// app.use('/api/auth',router);
// //connecting database

// mongoose.connect("mongodb://localhost:27017/finalproject",
//     {
//         useNewUrlParser:true,
//         useUnifiedTopology:true,
//     }
// ).then(()=>console.log('monogdb connected'))
// .catch((err)=>console.error(err));

// const PORT=process.env.PORT||5005;
// app.listen(PORT,()=>{
//     console.log(`server running on port ${PORT}`);
// });


import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/finalproject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Please provide a valid email address"],
  },
  password: { type: String, required: [true, "Password is required"] },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

// Routes
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ msg: "User registered successfully", token });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
      msg: "Error registering user",
      error: error.errors
        ? Object.values(error.errors).map((e) => e.message)
        : error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ msg: "Login successful", token });
  } catch (error) {
    console.error("Login Error:", error);
    res
      .status(500)
      .json({ msg: "Error logging in user", error: error.message });
  }
});

router.get("/dashboard", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "Welcome to your dashboard", user });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res
      .status(500)
      .json({ msg: "Error fetching dashboard data", error: error.message });
  }
});

app.use("/api/auth", router);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
