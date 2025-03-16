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

// // app.use('/api/auth',router);
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

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { urlencoded } from "express";
import mongoose from "mongoose";
import User from "./user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hi");
});

// ✅ FIXED SIGNUP ROUTE
app.post("/signup", async (req, res) => {
  console.log("Received Data:", req.body);
  const { name, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword }); //  Save hashed password
    await user.save();

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(201)
      .json({ msg: "User registered successfully", token: jwtToken });
  } catch (error) {
    console.error("Signup Error:", error);
    res
      .status(500)
      .json({ msg: "Error registering user", error: error.message });
  }
});

// ✅ FIXED LOGIN ROUTE
app.post("/login", async (req, res) => {
  console.log("Received Data:", req.body);
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", user.password);
    console.log("Password Match Result:", isMatch);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ msg: "User logged in successfully", token: jwtToken });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ msg: "Error logging in", error: error.message });
  }
});

// ✅ FIXED DASHBOARD ROUTE
app.get("/dashboard", async (req, res) => {
  console.log("Request received at /dashboard");
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ msg: "Unauthorized" });

    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ msg: "Invalid token format" });
    }

    const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Invalid token", error: err.message });
  }
});

//chatapikey call
import axios from "axios";

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) {
  console.error("❌ OPENAI_API_KEY is missing in .env file");
  process.exit(1);
}

// app.post("/chat", async (req, res) => {
//   try {
//     const { messages } = req.body;

//     if (!messages || !Array.isArray(messages)) {
//       return res.status(400).json({ reply: "Invalid request format" });
//     }

//     const response = await axios.post(
//       "https://api.openai.com/v1/chat/completions",
//       {
//         model: "gpt-3.5-turbo",
//         messages: messages.map((msg) => ({
//           role: msg.sender === "user" ? "user" : "assistant",
//           content: msg.text,
//         })),
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     res.json({ reply: response.data.choices[0].message.content });
//   } catch (error) {
//     console.error("❌ Backend Error:", error.response?.data || error.message);
//     res.status(500).json({ reply: "Error: Unable to get a response" });
//   }
// });

// const tf = require("@tensorflow/tfjs-node");
// const faceapi = require("@vladmandic/face-api");
// const canvas = require("canvas");

// faceapi.env.monkeyPatch({
//   Canvas: canvas.Canvas,
//   Image: canvas.Image,
//   ImageData: canvas.ImageData,
//   createImageData: canvas.createImageData,
// });

// app.use(cors());
// app.use(express.json({ limit: "50mb" }));

// async function loadModels() {
//   await faceapi.nets.faceRecognitionNet.loadFromDisk("./weights");
//   await faceapi.nets.ssdMobilenetv1.loadFromDisk("./weights");
//   await faceapi.nets.faceLandmark68Net.loadFromDisk("./weights");
// }

// loadModels().then(() => console.log("models loaded"));

// app.post("/api/analyze", async (req, res) => {
//   try {
//     if (!req.body.image) {
//       return res.status(400).json({ error: "No image provided" });
//     }

//     const image = new canvas.Image();
//     image.src = req.body.image;

//     const detections = await faceapi.detectAllFaces(image).withFaceLandmarks();

//     if (!detections || detections.length === 0) {
//       return res.json({ stressLevel: 50 });
//     }

//     // Basic "stress" estimation based on facial landmarks (very simplified)
//     let stressLevel = 50;
//     const mouthOpenness = detections[0].landmarks
//       .getMouth()
//       .map((pt) => pt.y)
//       .reduce((a, b) => Math.abs(a - b), 0);

//     if (mouthOpenness > 30) {
//       stressLevel += 20;
//     }
//     if (stressLevel > 100) stressLevel = 100;

//     res.json({ stressLevel });
//   } catch (error) {
//     console.error("Error during analysis:", error);
//     res.status(500).json({ error: "Analysis failed" });
//   }
// });
import PersonalDetails from "./Details.js";
app.post("/submit", async (req, res) => {
  const { name, dob, age, email, phone } = req.body;

  try {
    const newDetails = new PersonalDetails({ name, dob, age, email, phone });
    await newDetails.save();
    res.status(201).json({ message: "Data successfully saved!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save data" });
  }
});


















// ✅ MONGOOSE CONNECTION
mongoose
  .connect("mongodb://localhost:27017/finalproject")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.listen(5005, () => {
  console.log("Server is running on port 5005");
});
