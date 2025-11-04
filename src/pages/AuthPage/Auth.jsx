import styles from "./Auth.module.css";

//Importing External Components

import Loader from "../../components/Loader/Loader";

//Hooks
import { useFirebase } from "../../context/Fiebase";
import { useEffect, useRef, useState } from "react";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  Form,
} from "react-router-dom";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();

  //Calling hooks
  const fireBase = useFirebase();
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const navigate = useNavigate();

  //function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (pathname === "/auth/signup") {
        // ✅ check password first
        if (passRef.current.value !== confirmPassRef.current.value) {
          alert("Password doesn't match");
          return;
        }

        // ✅ signup
        await fireBase.signingupUser(
          emailRef.current.value,
          passRef.current.value,
          firstName.current.value,
          lastName.current.value
        );
      } else {
        // ✅ login
        await fireBase.LoginUser(emailRef.current.value, passRef.current.value);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (fireBase.isLoggedIn) {
      //navigate to home
      navigate("/");
    } else {
      navigate("/auth/login");
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
          <form onSubmit={handleSubmit}>
            <Outlet
              context={{
                confirmPassRef,
                emailRef,
                passRef,
                firstName,
                lastName,
              }}
            />
            <div className={styles.field}>
              <button
                className={`${styles.background} ${styles.btn}`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                <Loader />
                ) : pathname === "/auth/signup" ? (
                  "SignUp"
                ) : (
                  "LogIn"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
