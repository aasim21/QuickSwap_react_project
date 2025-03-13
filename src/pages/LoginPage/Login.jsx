//icons
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

//styles
import styles from "./Login.module.css";

//hooks
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

//Functional Component
const LoginPage = () => {
  const {emailRef, passRef} = useOutletContext();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
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
    </>
  );
};

export default LoginPage;
