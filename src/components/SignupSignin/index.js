import React, { useState } from "react";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import { toast } from "react-toastify";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
function SignupSigninComponents() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [logingForm, setLogingForm] = useState(false);
  const navigate = useNavigate();
  function singupWithEmail() {
    setLoading(true);
    console.log("Name", name, email, password, confirmPassword);
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log("User>>", user);
            toast.success("User created");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc(user);
            navigate("/dashboard");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
          });
      } else {
        toast.error("Password and Confirm Password Don't Matce!");
      }
    } else {
      setLoading(false);
      toast.error("All fields are mandatory!");
    }
  }
  function LoginUsingEmail() {
 
    console.log("email and password", email, password);
    setLoading(true);
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("User Logged In");
          console.log("user Login ", user);
          setLoading(false);
          navigate("/dashboard");
        
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }
  async function createDoc(user) {
    // create Doc
    setLoading(true);
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displyName ? user.displyName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc Created");
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);

      }
    } else {
      // toast.error("Doc Already Exited");
      setLoading(false);

    }}

    function googleLogin(){
      setLoading(true);
      try {
        signInWithPopup(auth, provider)
        .then((result)=>{
         const credential = GoogleAuthProvider.credentialFromResult(result);
         const token  = credential.accessToken;
         
         const user  = result.user;
         console.log("Show user Data", user);
         createDoc(user);
         navigate("/dashboard");
         toast.success("User authenticated")
         setLoading(false);
        })
        .catch((error)=>{
         const errorCode = error.code;
         const errorMessage = error.message;
        //  const email = error.customData.email;
        //  const credential = GoogleAuthProvider.credentialFromError(error);
        setLoading(false);
         
        toast.error(errorMessage);
        })
        
      } catch (error) {
        toast.error(error.message)
        setLoading(false);
        
      }
      
    }
    return (
      <>
        {logingForm ? (
          <div className="signup-wrapper">
            <h2 className="title">
              Login on <span style={{ color: "var(--theme)" }}>Financely.</span>{" "}
            </h2>
            <form>
              <Input
                type="email"
                label={"Email"}
                state={email}
                setState={setEmail}
                placeholder={"johndoe@gmail.com"}
              />
              <Input
                type="password"
                label={"Password"}
                state={password}
                setState={setPassword}
                placeholder={"Abcd@1234"}
              />

              <Button
                disabled={loading}
                text={
                  loading ? "Loading..." : "Login Using Email and Password "
                }
                onClick={LoginUsingEmail}
              />
              <p className="p-login">or</p>
              <Button
                  onClick={googleLogin}
                text={loading ? "Loading..." : "Login Using Google"}
                blue={true}
              />
              <p
                className="p-login"
                style={{ cursor: "pointer" }}
                onClick={() => setLogingForm(!logingForm)}
              >
                Or Don't Have An Account? Click Here
              </p>
            </form>
          </div>
        ) : (
          <div className="signup-wrapper">
            <h2 className="title">
              Sign Up on{" "}
              <span style={{ color: "var(--theme)" }}>Financely.</span>{" "}
            </h2>
            <form>
              <Input
                label={"Full Name"}
                state={name}
                setState={setName}
                placeholder={"John Doe"}
              />
              <Input
                type="email"
                label={"Email"}
                state={email}
                setState={setEmail}
                placeholder={"johndoe@gmail.com"}
              />
              <Input
                type="password"
                label={"Password"}
                state={password}
                setState={setPassword}
                placeholder={"Abcd@1234"}
              />
              <Input
                type="password"
                label={"Confirm Password"}
                state={confirmPassword}
                setState={setConfirmPassword}
                placeholder={"Abcd@1234"}
              />
              <Button
                disabled={loading}
                text={
                  loading ? "Loading..." : "SignUp Using Email and Password "
                }
                onClick={singupWithEmail}
              />
              <p className="p-login">or</p>
              <Button
                 onClick={googleLogin}
                text={loading ? "Loading..." : "SignUp Using Google"}
                blue={true}
              />
              <p
                className="p-login"
                style={{ cursor: "pointer" }}
                onClick={() => setLogingForm(!logingForm)}
              >
                Or Already Have An Account? Click Here
              </p>
            </form>
          </div>
        )}
      </>
    );
  }


export default SignupSigninComponents;
