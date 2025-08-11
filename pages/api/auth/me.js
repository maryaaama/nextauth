import connectToDB from "@/config/db";
import { verifyToken } from "@/utils/auth";
import UserModel from "@/models/User";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectToDB();

    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "you are not login" });
    }

    const isValidToken = verifyToken(token);

    if (!isValidToken) {
      return res.status(401).json({ message: "you are not login" });
    }

    const user = await UserModel.findOne(
      { email: isValidToken.email },
      "firstName lastName role"
    );

    return res.status(200).json({ data: user });

  } catch (error) {
    console.error("verify token =>", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
