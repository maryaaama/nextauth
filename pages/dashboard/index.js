import connectToDB from '@/config/db';
import UserModel from '@/models/User'
import { verifyToken } from "@/utils/auth";
import styles from '@/styles/Dashboard.module.css';
import React from "react";

function Dashboard({user}) {
  return (
    <>
      <h1 className={styles.cardh}>{user.firstName} - {user.lastName} - Welcome To Dashboard</h1>
    </>
  );
}


export async function getServerSideProps(context) {
  const { token } = context.req.cookies;
  connectToDB();
  console.log("Token:", token);

  if (!token) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  const isValidToken = verifyToken(token);
  console.log("Is valid token:", isValidToken);

  if (!isValidToken) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  const user = await UserModel.findOne({
    email:isValidToken.email,
  },
   "-_id firstName lastName role"
);
   console.log(user)
  return {
    props: {
      user:JSON.parse(JSON.stringify(user)),
    },
  };
}

export default Dashboard;
