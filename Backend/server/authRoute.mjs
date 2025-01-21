import dotenv from 'dotenv';
dotenv.config();


import jwt from "jsonwebtoken";
import User from "./user.mjs";
import express from 'express';
import bcrypt from 'bcryptjs';



// console.log(process.env);
// console.log("JWT_SECRET:", process.env.JWT_SECRET);



const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

const router=express.Router();

router.post('/signup',async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        const userExists=await User.findOne({email});
        if (userExists){
            return res.status(400).json({msg:'user already ezxit '});
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user=new User ({name,email,password});
        await user.save()
        console.log("User ID:", user._id);
        console.log(process.env);
        console.log("Jwt" ,process.env.JWT_SECRET);

        if (!user._id) {
          throw new Error("Failed to create user");
        }

    //jwt generation
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});

         res.status(201).json({msg:'user resgister successfully',token});
         }catch(error){
          console.error("Signup Error:", error);
            res.status(500).json({msg:'Error registering user',error:error.message});
         }
});


router.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    try{

        const user= await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({msg:'user not found'});
        }
        const isMatch=await user.matchPassword(password);
        if(!isMatch)
        {
            return res.status(400).json({msg:'errror in password'});
        }
        //token 
        const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET || "defaultSecret",
          { expiresIn: "1h" }
        );
        console.log("Generated Token:", token);

    }catch(error)
    {
        res.status(500).json({msg:'Error logging in user',error:error.message})
    }
});

router.get("/dashboard", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token

  if (!token) {
    return res.status(403).json({ msg: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json({ msg: "Welcome to your dashboard", user });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error fetching dashboard data", error: error.message });
  }
});

export default router;