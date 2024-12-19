//CSS
import styles from "./OrdersPage.module.css";

//Components
import Nav from "../../components/Navbar/Nav";
import CardComp from "../../components/Card/Card";

//Hooks
import { useEffect, useState } from "react";
import { useFirebase } from "../../context/Fiebase";
//Functional Component
const OrdersPage = () => {
  const fireBase = useFirebase();
  const [items, setItems] = useState([]);
  console.log("Orders page comp rendered");
  useEffect(() => {
    if (fireBase.isLoggedIn) {
      fireBase.fetchMyListItems(fireBase.user.uid).then((val) => {
        setItems(val.docs);
      });
    }
  }, [fireBase]);

  if(!fireBase.isLoggedIn) return (<h1>Please LogIn....</h1>);

  return (
    <div className={styles.main_container}>
      <Nav />
      <div className={styles.main_container_child}>
        <h1 className={styles.child_cont_heading}>Your Items</h1>
        <div className={styles.items_div}>
            {items.map((item)=>{
                return <CardComp link = {`/items/orders/${item.id}`} key = {item.id} {...item.data()}/>
            })}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
