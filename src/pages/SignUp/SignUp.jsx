import styles from "./SignUp.module.css";
import { useOutletContext } from "react-router-dom";
const SignUp = () => {
  const confirmPassRef = useOutletContext();
  console.log(confirmPassRef);
  return (
    <div className={styles.field}>
      <input
        type="password"
        name="confirmPass"
        ref={confirmPassRef}
        placeholder="Confirm Password"
        required
      ></input>
    </div>
  );
};

export default SignUp;
