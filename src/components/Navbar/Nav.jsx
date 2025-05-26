//Importing Styles
import styles from "./Nav.module.css";

//Importing Components
import { NavLink } from "react-router-dom";

//Importing Hooks
import { useFirebase } from "../../context/Fiebase";
import { useState } from "react";

//Importing Logo
import logo from "./Yuvi _20241214_131303_0000.png";

//Importing Icons
import { RiMenu3Fill } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";

//Navbar Menu Component
const Menu = () => {
  return (
    <div className={styles.nav_items}>
      <span>
        <NavLink
          to="/"
          className={styles.nav_item}
          style={({ isActive }) => ({
            color: isActive
              ? "var(--navlink-active-color)"
              : "var(--navlink-inactive-color)",
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
            color: isActive
              ? "var(--navlink-active-color)"
              : "var(--navlink-inactive-color)",
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
            color: isActive
              ? "var(--navlink-active-color)"
              : "var(--navlink-inactive-color)",
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
            color: isActive
              ? "var(--navlink-active-color)"
              : "var(--navlink-inactive-color)",
          })}
        >
          Placed Orders
        </NavLink>
      </span>
    </div>
  );
};

//NavBar Component
const Nav = () => {
  const fireBase = useFirebase();
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className={styles.main_container}>
      <div className={styles.img_container}>
        <img src={logo} />
      </div>
      <div className={styles.nav_menu_links}>
        <Menu />
      </div>
      <div className={styles.nav_menu}>
        <div className={styles.auth_container}>
          <span className={styles.sign_out_btn}>
            <NavLink
              to="/auth/login"
              onClick={fireBase.signOutUser}
              className={styles.nav_item}
              style={{ color: "#fff" }}
            >
              SignOut
            </NavLink>
          </span>
        </div>
        <div className={styles.nav_menu_div}>
          {toggleMenu ? (
            <RiCloseFill
              size={27}
              color="#03045e"
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <RiMenu3Fill
              size={27}
              color="#03045e"
              onClick={() => setToggleMenu(true)}
            />
          )}

          {toggleMenu && (
            <div className={styles.nav_menu_container}>
              <Menu />
              <div className={styles.nav_menu_container_btn}>
                <span className={styles.sign_out_btn}>
                  <NavLink
                    to="/auth/login"
                    onClick={fireBase.signOutUser}
                    className={styles.nav_item}
                    style={{ color: "#fff" }}
                  >
                    SignOut
                  </NavLink>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
