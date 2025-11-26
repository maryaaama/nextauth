import usersModel from "@/models/User";
import connectToDB from "@/config/db";
import { generateToken, hashPassword, verifyPassword } from "@/utils/auth";
import { serialize } from "cookie";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectToDB();

    const { identifier, password } = req.body;

    if (!identifier?.trim() || !password?.trim()) {
      return res.status(422).json({ message: "Data is not valid" });
    }

    const user = await usersModel.findOne({
      $or: [{ userName: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return res.status(422).json({ message: "Username or password is not correct" });
    }

    const token = generateToken({ email: user.email });

    res.setHeader(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24, 
        sameSite: "strict", 
        secure: process.env.NODE_ENV === "production", 
      })
    );

    return res.status(200).json({ message: "User logged in successfully" });

  } catch (error) {
    console.error("ERROR in signin API:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
