/*const {default:mongoose} = require ("mongoose");
const connectToDB = async()=>{
    try{
        if(mongoose.connections[0].readyState){
            return true;
        }else {
            await mongoose.connect("mongodb://localhost:27017/next-auth");
            console.log("connect To DB successfully")
        }
        }catch(err){
            console.log("DB connection has err=>",err)
        }
    
};
export default connectToDB;*/
import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true; // اتصال قبلاً برقرار شده
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "signup", // نام دیتابیس شما
    });

    console.log("✅ Connected to MongoDB Atlas successfully");
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
};

export default connectToDB;
