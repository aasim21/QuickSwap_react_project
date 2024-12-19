import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import { useFirebase } from "../../context/Fiebase";
import logo from "./Yuvi _20241214_131303_0000.png";
import { Button } from "react-bootstrap";
import { useEffect } from "react";

const Nav = () => {
  //Calling Hooks
  const fireBase = useFirebase();
  
  return (
    <div className={styles.main_container}>
      <div className={styles.img_container}>
        <img src={logo} />
      </div>
      <div className={styles.nav_items}>
        <span>
          <NavLink
            to="/home"
            className={styles.nav_item}
            style={({ isActive }) => ({
              color: isActive ? "#FBA0e3" : "#03045e",
            })}
          >
            Home
          </NavLink>
        </span>
        <span>
          <NavLink
            to="/item/list"
            className={styles.nav_item}
            style={({ isActive }) => ({
              color: isActive ? "#FBA0e3" : "#03045e",
            })}
          >
            Add Listing
          </NavLink>
        </span>
        <span>
          <NavLink
            to="/items/orders"
            className={styles.nav_item}
            style={({ isActive }) => ({
              color: isActive ? "#FBA0e3" : "#03045e",
            })}
          >
            Orders
          </NavLink>
        </span>
        <span>
          <NavLink
            to="/items/placedorders"
            className={styles.nav_item}
            style={({ isActive }) => ({
              color: isActive ? "#FBA0e3" : "#03045e",
            })}
          >
            Placed Orders
          </NavLink>
        </span>
      </div>
      <div className={styles.auth_container}>
        <span>
          <NavLink
            to="/login"
            className={styles.nav_item}
            style={{ color: "#03045e" }}
          >
            Login
          </NavLink>
        </span>
        <span>
          <NavLink
            to="/register"
            className={styles.nav_item}
            style={{ color: "#03045e" }}
          >
            SignUp
          </NavLink>
        </span>
        <span>
          <NavLink
          to="/login"
            onClick={fireBase.signOutUser}
            className={styles.nav_item}
            style={{ color: "#03045e" }}
          >
            SignOut
          </NavLink>
        </span>
      </div>
    </div>
  );
};

export default Nav;
