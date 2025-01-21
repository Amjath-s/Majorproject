
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
// import authRoutes from "authRoutes.js"
import express from "express"
import router from "./authRoute.mjs";

dotenv.config();


const app=express();

app.use(cors());
app.use(express.json());

//Routing 

app.use('/api/auth',router);
//connecting database

mongoose.connect("mongodb://localhost:27017/finalproject",
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }
).then(()=>console.log('monogdb connected'))
.catch((err)=>console.error(err));

const PORT=process.env.PORT||5005;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
});


