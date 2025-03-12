import styles from "./Auth.module.css";

//icons
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

//Hooks
import { useFirebase } from "../../context/Fiebase";
import { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useLocation, useNavigate, Form } from "react-router-dom";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { pathname } = useLocation();

  //Calling hooks
  const fireBase = useFirebase();
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  const navigate = useNavigate();

  //function to handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    pathname == "/auth/signup" ? (passRef.current.value === confirmPassRef.current.value ? await fireBase.signingupUser(
        emailRef.current.value,
        passRef.current.value) : alert("Password doesn't match")) : ( await fireBase.LoginUser(emailRef.current.value, passRef.current.value));

  };
  useEffect(() => {
    if (fireBase.isLoggedIn) {
      //navigate to home
      navigate("/");
    }
  }, [fireBase.isLoggedIn]);

  return (
    <div className={`${styles.mainContainer} ${styles.background}`}>
      <div className={styles.childCont}>
        <div className={styles.heading}>
          {pathname == "/auth/signup" ? "SignUp" : "LogIn"}
        </div>
        <div className={styles.slider}>
          <NavLink
            to="/auth/login"
            className={({ isActive }) => {
              return `${styles.label} ${isActive ? styles.background : ""}`;
            }}
          >
            <label
              style={{ width: "100%", height: "100%", cursor: "pointer" }}
              htmlFor="login"
            >
              LogIn
            </label>
          </NavLink>
          <NavLink
            to="/auth/signup"
            className={({ isActive }) => {
              return `${styles.label} ${isActive ? styles.background : ""}`;
            }}
          >
            <label
              style={{ width: "100%", height: "100%", cursor: "pointer" }}
              htmlFor="SignUp"
            >
              SignUp
            </label>
          </NavLink>
        </div>
        <div className={styles.formCont}>
          <form onSubmit = {handleSubmit}> 
            <div className={styles.field}>
              <input type="email" placeholder="Email Address" ref = {emailRef} required></input>
            </div>
            <div className={styles.field}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                ref= {passRef}
                required
              ></input>
              {showPassword ? (
                <FaEyeSlash
                  className={styles.icon}
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaRegEye
                  className={styles.icon}
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            <Outlet context={confirmPassRef}/>
            <div className={styles.field}>
              <input
                className={`${styles.background} ${styles.btn}`}
                type="submit"
                value={pathname == "/auth/signup" ? "SignUp" : "LogIn"}
              ></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Auth;
