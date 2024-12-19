//CSS
import styles from "../OrdersPage/OrdersPage.module.css";
import ownStyle from "./ViewOrderDetails.module.css";
//Components
import Nav from "../../components/Navbar/Nav";

//Hooks
import { useParams, useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/Fiebase";
import { useEffect, useState } from "react";
import OrdersCard from "../../components/OrdersCard/OrdersCard";

//Functional Component
const ViewOrderDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const fireBase = useFirebase();
  useEffect(() => {
    fireBase.getOrders(params.itemID);
  }, []);

  useEffect(() => {
    // console.log(fireBase.isLoggedIn);
    //Checking User Logging in
    if (!fireBase.isLoggedIn) {
      navigate("/login");
    }
  }, [fireBase.isLoggedIn]);

  if(fireBase.orders == null) return (<h3>Loading......</h3>)
  return (
    <div className={styles.main_container}>
      <Nav />
      <div className={styles.main_container_child}>
        <h1 className={styles.child_cont_heading}>Recieved Orders Details: </h1>
        <div className={ownStyle.orders_div}>
          {fireBase.orders.map((order) => {
            return <OrdersCard id = {order.id} itemId = {params.itemID} key = {order.id} {...order.data()} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ViewOrderDetails;
