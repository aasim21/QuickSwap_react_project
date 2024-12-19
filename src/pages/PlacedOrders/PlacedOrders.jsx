//Styles
import styles from "../OrdersPage/OrdersPage.module.css";
import ownStyle from "./PlacedOrders.module.css";
//Components
import Nav from "../../components/Navbar/Nav";
import PlacedOrdersCard from "../../components/PlacedOrdersCard/PlacedOrdersCard";
//Hooks
import { useEffect, useState } from "react";
import { useFirebase } from "../../context/Fiebase";
//Functional Component
const PlacedOrdersPage = () => {
  const fireBase = useFirebase();
  console.log("Placed Orders mounted");
  useEffect(() => {
    if(fireBase.isLoggedIn){
      fireBase.getPlacedOrders(fireBase.user.uid);
    }
  },[])

  if(fireBase.placed_orders == null) return (<h1>Loading....</h1>);
  return (
    <div className={ownStyle.main_container}>
      <Nav />
      <div className={styles.main_container_child}>
        <h1 className={styles.child_cont_heading}>Placed Orders</h1>
        <div className={styles.items_div}>
          {fireBase.placed_orders.map((placed_order) =>{
            return <PlacedOrdersCard id = {placed_order.id} key = {placed_order.id} {...placed_order.data()}/>
          })}
        </div>
      </div>
     
    </div>
  );
};

export default PlacedOrdersPage;
