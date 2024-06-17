import "./Auth.css"
import Loginimg from "../assets/login.jpg";
import Signup from "../components/Auth/Signup";
import { useState } from "react";
import Login from "../components/Auth/Login";

const Auth = () => {
   const[auth,setAuth]=useState(true);       
  return (
    <div className="Authorisation">
      <div className="Authorisation-container">
        <div className="Auth-image">
          <img src={Loginimg} alt="" className="image" loading="eager"/>
        </div>
        {/* Login-Signup-container */}
        <div className={auth?"Signup-container":"Login-container"}>
          <h1 className="Header">Welcome to Chat Buddies</h1>
          {auth?<Signup toggleAuth={()=>setAuth(!auth)}/>:<Login toggleAuth={()=>setAuth(!auth)}/>}
        </div>
      </div>
    </div>
  );
};

export default Auth;
