import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Index() {
  const router=useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
   
  useEffect(()=>{
    fetch("/api/auth/me").then(res=>{
      
      if(res.status===200)
        router.replace('/dashboard')
    })
  },[])

  const signIn = async (event) => {
    event.preventDefault();
    const user = { identifier, password };

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      if (res.ok) {
        alert("ورود موفقیت‌آمیز بود");
         router.replace('/')
        console.log("res", data);
      } else {
        alert(data.message || "خطا در ورود");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("خطا در ارسال درخواست");
    }
  };

  return (
    <div className="box">
      <h1 align="center">Login Form</h1>
      <form role="form" method="post" onSubmit={signIn}>
        <div className="inputBox">
          <input
            type="text"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            autoComplete="off"
            required
          />
          <label>Username</label>
        </div>
        <div className="inputBox">
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)} 
            autoComplete="off"
            required
          />
          <label>Password</label>
        </div>

        <input type="submit" className="register-btn" value="Sign In" />
      </form>
    </div>
  );
}

export default Index;
