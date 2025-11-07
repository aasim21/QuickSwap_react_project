//Hooks
import { useParams, useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/Fiebase";
import { useEffect, useState } from "react";
//CSS
import styles from "./ItemDetail.module.css";

//Components
import Button from "react-bootstrap/Button";
import Nav from "../../components/Navbar/Nav";

//Functional Component
const ItemDetail = () => {
  const params = useParams();
  const fireBase = useFirebase();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  //Hnadling UseEffect
  useEffect(() => {
    fireBase.getItemById(params.itemID).then((value) => {
      setData(value.data());
    });
  }, []);
  useEffect(() => {
    if (!fireBase.isLoggedIn) {
      // console.log("useEffect under ItemDetails with condition");
      navigate("/auth/login");
    }
  }, [fireBase.isLoggedIn]);

  //Handling Buy Now
  const handleBuyNow = async () => {
    const hasPurchased = await fireBase.checkingConstraint(
      params.itemID,
      fireBase.user.uid
    );
    if (!hasPurchased) {
      const result = await fireBase.placeOrder(params.itemID);
      console.log("Order Placed", result);
      await fireBase.handleNewPlacedOrder(
        data,
        fireBase.user.uid,
        params.itemID
      );
      navigate("/items/placedorders");
    } else alert("You have already requested a purchase on this item.");
  };
  // console.log(data);
  if (data == null) return <h1>Loading....</h1>;

  return (
    <div className={styles.main_container}>
      <Nav />
      <div className={styles.main_container_child}>
        <div className={styles.left_box}>
          <div className={styles.img_container}>
            <img
              className={styles.item_img}
              src={data.imageURL}
              alt="Item Photo"
            />
          </div>
          <div className={styles.btn_container}>
            {data.userID !== fireBase.user.uid && data.isSold !== true && (
              <button onClick={handleBuyNow} className={styles.buy_btn}>
                Buy Now
              </button>
            )}
          </div>
        </div>
        <div className={styles.info_container}>
          <h3 className={styles.title}>{data.title}</h3>
          <p className={styles.description}>{data.desc}</p>
          <p className={styles.price}>
            <span>&#8377;</span>&nbsp;
            {Number(data.price).toLocaleString("en-IN")}
          </p>
          <div className={styles.owner_details}>
            <h5>Owner Details: </h5>
            <label
              htmlFor="userEmail"
              style={{ fontSize: "1.1rem", fontWeight: "550" }}
            >
              Seller Email:
            </label>
            <a target="_blank" href = {`mailto:${data.userEmail}`} id="userEmail" className={styles.owner}>
              {data.userEmail}
            </a>
          </div>
          <div className={styles.btn_info_container}>
            {data.userID !== fireBase.user.uid && data.isSold !== true && (
              <button onClick={handleBuyNow} className={styles.buy_btn}>
                Buy Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemDetail;
