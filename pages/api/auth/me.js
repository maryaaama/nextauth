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

    // پیدا کردن کاربر در دیتابیس فقط با فیلدهای مورد نیاز
    const user = await UserModel.findOne(
      { email: isValidToken.email },
      "_id firstName lastName role"
    );

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    // ✅ اینجا id رو هم به داده‌ی خروجی اضافه می‌کنیم
    const userData = {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };

    return res.status(200).json({ data: userData });

  } catch (error) {
    console.error("verify token =>", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
