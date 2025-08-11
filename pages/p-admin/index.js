import React from "react";
import connectToDB from "@/config/db";
import UserModel from "@/models/User";
import { verifyToken } from "@/utils/auth";

function PAdmin({ user }) {
  return (
    <div>
      <h1>Welcome To Admin Panel ❤️</h1>
      <p>Hello {user.firstName} {user.lastName}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { token } = context.req.cookies;

  // اتصال به دیتابیس
  await connectToDB();

  // اگر توکن وجود ندارد
  if (!token) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  // اعتبارسنجی توکن
  const isValidToken = verifyToken(token);
  if (!isValidToken) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  // گرفتن اطلاعات کاربر
  const user = await UserModel.findOne(
    { email: isValidToken.email },
    "-_id firstName lastName role"
  );

  // اگر کاربر پیدا نشد یا ادمین نبود
  if (!user || user.role !== "admin") {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}

export default PAdmin;
