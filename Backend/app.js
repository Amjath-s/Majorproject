// import cors from "cors";
// import express, { urlencoded } from "express";
// import mongoose from "mongoose";

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(urlencoded({ extended: true }));
// app.get("/", (req, res) => {
//   res.send("hi");
// });
// app.post("/signup", (req, res) => {
//   const { name, email, password } = req.body;
//   res.send("signup done");
// });
// mongoose
//   .connect("mongodb://localhost:27017/finalproject")
//   .then(() => console.log("connete to mongoose"))
//   .catch((err) => console.error(err));
// app.listen(5005, () => {
//   console.log("server is running");
// });
