import React, { useEffect, useState } from "react";
import Link from "next/link";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignIn,
  faSignOut,
  faSolarPanel,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin,setIsAdmin] = useState(false);
  const router=useRouter();
  useEffect(() => {
    const userAuth = async () => {
      const res = await fetch("/api/auth/me");
      if (res.status === 200) {
        setIsLoggedIn(true);
        const {data:user} = await res.json();
        if(user.role==="admin"){
         setIsAdmin(true);
        }
        console.log(user);
      }
      console.log("res=>", res);
    };
    userAuth();
  }, []);

    const signOut = async () => {
       console.log("ejra shod");
       try {
         const res = await fetch("/api/auth/signout", { 
           method: "POST",
           credentials: "include"
         });
         const data = await res.json();
         console.log("data", data);
     
         if (res.status === 200) {
           setIsAdmin(false);
           setIsLoggedIn(false);
           await router.replace("/");
           router.reload(); 
         }
       } catch (error) {
         console.error("Logout error:", error);
       }
     };


  return (
    <div className="container">
      <aside className="sidebar">
        <h3 className="sidebar-title">Sidebar</h3>

        <ul className="sidebar-links">
          {/* User is logged in */}
          {isLoggedIn ? (
            <>
              <li>
                <Link href="/dashboard">
                  <span>
                    <FontAwesomeIcon icon={faBars} />
                  </span>
                  Dashboard
                </Link>
              </li>
              <li onClick={signOut} style={{ cursor: "pointer" }} className="neon-btn">
               <span>
                 <FontAwesomeIcon icon={faSignOut} />
               </span>
               Logout
             </li>

            </>
          ) : (
            <>
              <li>
                <Link href="/signin">
                  <span>
                    <FontAwesomeIcon icon={faSignIn} />
                  </span>
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <span>
                    <FontAwesomeIcon icon={faSignIn} />
                  </span>
                  Sign up
                </Link>
              </li>
            </>
            
          )}

          {/* Admin panel link */}
          {isAdmin&&(
            <>
              <li>
               <Link href="/p-admin">
                <span>
                <FontAwesomeIcon icon={faSolarPanel} />
              </span>
              Admin panel
            </Link>
          </li>
            </>
          )}
          
        </ul>

        <img className="wave" src="/Images/wave.svg" alt="wave" />
      </aside>
      <main className="main"></main>
    </div>
  );
}

export default Index;
