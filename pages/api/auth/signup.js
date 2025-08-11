import usersModel from "@/models/User";
import connectToDB from "@/config/db";
import { generateToken, hashPassword } from "@/utils/auth";
import { serialize } from "cookie";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: 'متد غیرمجاز' });
  }

  try {
    await connectToDB();
    const { firstName, lastName,userName, email, password } = req.body;
    
    if (!firstName?.trim() || !lastName?.trim()||!userName.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({ success: false, message: 'تمامی فیلدها الزامی هستند' });
    }
      
     const isUserExist =await usersModel.findOne({
      $or:[{userName},{email}],
     })
     if(isUserExist){
      return res.status(422).json({message:"user hast"})
     }
     
     const hashedPassword = await hashPassword(password);

     const token = generateToken({email})  

     const users = await usersModel.find();
     const isAdmin = users && users.length === 0;

     const UserModel = await usersModel.create({
       firstName,
       lastName,
       userName,
       email,
       password: hashedPassword,
       role: isAdmin ? "admin" : "user",
     });

    return res.setHeader("set-cookie" , serialize("token", token ,{
      httpOnly:true ,
      path:"/",
      maxAge: 60 * 60 * 24,
    })
     ).status(201).json({ success: true, data: UserModel , token} );
     } catch (error) {
      console.error("ERROR in signup API:", error);
      return res.status(500).json({ success: false, message: error.message });
     }
  };

export default handler;