import { headers } from "@/next.config";
import React, { useState } from "react";
import Router from "next/router";
function Index() {
  const [firstName , setFirstName] = useState("");
  const [lastName , setLastName] = useState("");
  const [userName , setUserName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  
   const SignUp = async (event)=>{
    event.preventDefault();
    const user = {
    firstName,
    lastName,
    userName,
    email,
    password
  };

 
   const res = await fetch('/api/auth/signup', {
  method: "POST",
  headers: {
    'Content-Type': "application/json"
  },
  body: JSON.stringify(user),
});

if (res.status === 201) {
  setFirstName("");
  setLastName("");
  setPassword("");
  setEmail("");
  setUserName("");
  alert('registered successfully');
  Router.replace('/dashboard');
}else if (res.status===422){
  alert("user hast")
}
 
   }

  return (
    <div className="box">
      <h1 align="center">SignUp Form</h1>
      <form role="form" onSubmit={SignUp}  method="post">
        <div className="inputBox">
          <input type="text"  
           value={firstName}
           onChange={(event) =>setFirstName(event.target.value)}
          autoComplete="off" required />
          <label>Firstname</label>
        </div>
        <div className="inputBox">
          <input type="text" 
           value={lastName}
           onChange={(event) =>setLastName(event.target.value)}
          autoComplete="off" required />
          <label>Lastname</label>
        </div>
        <div className="inputBox">
          <input type="text" 
           value={userName}
           onChange={(event) =>setUserName(event.target.value)}
          autoComplete="off" required />
          <label>Username</label>
        </div>
        <div className="inputBox">
          <input type="email"  
           value={email}
           onChange={(event) =>setEmail(event.target.value)}
          autoComplete="off" required />
          <label>Email</label>
        </div>
        <div className="inputBox">
          <input type="password" 
           value={password}
           onChange={(event) =>setPassword(event.target.value)}
          autoComplete="off" required />
          <label>Password</label>
        </div>

        <input type="submit"  className="register-btn" value="Sign Up" />
      </form>
    </div>
  );
}

export default Index;
