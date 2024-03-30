import React from "react";
import "./styles.css";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import userPhoto from "../Images/user-solid.svg"
function Header() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);
  function logoutFnc() {
   
    try {
        signOut(auth)
        .then(()=>{
            // user logout
            toast.success("User Logout Sucessful")
            navigate("/");

        })
        .catch((e)=>{
          toast.error(e.message); 
        })
       

    } catch (error) {
        // an error
        toast.error(error.message)
        
    }
  }
  return (
    <div class="navbar">
      <p className="logo">Financely.</p>
      {user && (
        <div style={{display:"flex", alignItems:"center", gap:"0.7rem"}}>
          <img src={user.photoURL?user.photoURL: userPhoto}  style={{borderRadius:"50%", height:"30px"}}/>
        <p className="logo link" onClick={logoutFnc}>
          Logout
        </p>
        </div>
      )}
    </div>
  );
}

export default Header;
