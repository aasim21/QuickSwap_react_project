import styles from "./SignUp.module.css";

//icons
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

//Hooks
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

//Functional Component
const SignUp = () => {
  const { confirmPassRef, emailRef, passRef } = useOutletContext();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className={`${styles.field} ${styles.flex}`}>
        <input className={`${styles.nameContainer} ${styles.marginRight}`}
          type="text"
          placeholder="First Name"
          required
        ></input>
         <input className={styles.nameContainer}
          type="text"
          placeholder="Last Name"
          required
        ></input>
      </div>
      <div className={styles.field}>
        <input
          type="email"
          placeholder="Email Address"
          ref={emailRef}
          required
        ></input>
      </div>
      <div className={styles.field}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          ref={passRef}
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
      <div className={styles.field}>
        <input
          type="password"
          ref={confirmPassRef}
          placeholder="Confirm Password"
          required
        ></input>
      </div>
    </>
  );
};

export default SignUp;
