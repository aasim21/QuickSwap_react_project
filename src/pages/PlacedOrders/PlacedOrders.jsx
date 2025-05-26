//Styles
import styles from "../OrdersPage/OrdersPage.module.css";
import ownStyle from "./PlacedOrders.module.css";
//Components
import Nav from "../../components/Navbar/Nav";
import PlacedOrdersCard from "../../components/PlacedOrdersCard/PlacedOrdersCard";
//Hooks
import { useEffect, useState } from "react";
import { useFirebase } from "../../context/Fiebase";
import firebase from "firebase/compat/app";
//Functional Component
const PlacedOrdersPage = () => {
  const fireBase = useFirebase();
  const [placedOrders, setPlacedOrders] = useState([]);
  // console.log("Placed Orders mounted");
  useEffect(() => {
    if (fireBase.isLoggedIn) {
      fireBase
        .getPlacedOrders(fireBase.user.uid)
        .then((result) => setPlacedOrders(result));
    }
  }, [fireBase.isLoggedIn]);

  // if(placedOrders == "") return <h1>Loading....</h1>;
  console.log(placedOrders);
  return (
    <div className={ownStyle.main_container}>
      <Nav />
      <div className={styles.main_container_child}>
        <h1 className={styles.child_cont_heading}>Placed Orders</h1>
        <div className={ownStyle.table_main_container}>
          <div className={ownStyle.t_header}>
            <span
              className={`${ownStyle.t_header_items} ${ownStyle.f_header_item}`}
            >
              Item Name
            </span>
            <span className={ownStyle.t_header_items}>Price</span>
            <span className={`${ownStyle.t_header_items} ${ownStyle.status}`}>Status</span>
            <span
              className={`${ownStyle.t_header_items} ${ownStyle.l_header_item}`}
            >
              Check Details
            </span>
          </div>
          {placedOrders.map((order) => {
            const color =
              order.data().status === "pending"
                ? "#e19c38"
                : order.data().status === "true"
                ? "#0EA046"
                : "#D36769";
            const bgColor =
              order.data().status === "pending"
                ? "#fff2f5"
                : order.data().status === "true"
                ? "#ECFBF2"
                : "#FDF2EE";
            return (
              <PlacedOrdersCard
                id={order.id}
                key={order.id}
                setPlacedOrders  = {setPlacedOrders}
                color = {color}
                bgColor = {bgColor}
                {...order.data()}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlacedOrdersPage;
