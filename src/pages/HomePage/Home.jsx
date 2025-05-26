//Hooks
import { useFirebase } from "../../context/Fiebase";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//Components
import Hero from "../../components/Hero/Hero";
import Nav from "../../components/Navbar/Nav";
import CardComp from "../../components/Card/Card";
import Footer from "../../components/Footer/Footer";
//Importing styles
import styles from "./Home.module.css";

//Function Component
const HomePage = () => {
  //Calling Hooks
  const [items, setItems] = useState([]);
  const fireBase = useFirebase();
  const navigate = useNavigate();
  useEffect(() => {
    if (fireBase.isLoggedIn) {
      //Getting the data
      fireBase.listAllItems().then((items) => {
        setItems(items.docs);
      });
    } else {
      navigate("/auth/login");
    }
  }, [fireBase.isLoggedIn]);
  return (
    <div className={styles.main_container}>
      <Nav />
      <Hero />
      <div className={styles.items_div_main}>
        <h1 className={styles.items_div_heading}>Featured Items</h1>
        <div className={styles.items_div}>
          {items.map((item) => {
            return (
              <CardComp
                link={`/item/view/${item.id}`}
                key={item.id}
                {...item.data()}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
