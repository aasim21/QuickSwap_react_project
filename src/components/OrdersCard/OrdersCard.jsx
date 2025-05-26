//Importing BootStrap Components
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

//Importing Styles
import styles from "./OrdersCard.module.css";

//Importing Hooks
import { useFirebase } from "../../context/Fiebase";

//Importing Icons
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

//Functional Component
const OrdersCard = (props) => {
  const fireBase = useFirebase();
  //handling Order rejection
  const handleOrderRejected = async (orderId, itemId, userId) => {
    await fireBase.deleteOrderRequest(orderId, itemId);
    await fireBase.handleOrderRejection(itemId, userId);
    await fireBase.getOrders(itemId);
  };

  //handling Order Acceptance
  const handleOrderAccepted = async (orderId, itemId, userId) => {
    await fireBase.handleOrderAcceptedVal(itemId, userId);
    await fireBase.handleOrderAccepted(orderId, itemId);
    await fireBase.changeIsSoldVal(itemId);
    await fireBase.getOrders(itemId);
  };
  return (
    <Card className={styles.main_container}>
      <Card.Body>
        <div className={styles.info_container}>
          <Card.Title>Buyer Email: </Card.Title>
          <Card.Subtitle className={`mb-2 text-muted ${styles.email}`}>
            {props.userEmail}
          </Card.Subtitle>
        </div>
        {props.hasSold == "pending" ? (
          <div className = {styles.btns_container} style={{ display: "flex" }}>
            <button
              className={`${styles.btns} ${styles.accept_btn}`}
              onClick={() => {
                handleOrderAccepted(props.id, props.itemId, props.userID);
              }}
            >
              <FaCheck />
            </button>
            <button
              className={`${styles.btns} ${styles.reject_btn}`}
              onClick={() => {
                handleOrderRejected(props.id, props.itemId, props.userID);
              }}
            >
              <FaXmark />
            </button>
          </div>
        ) : (
          <div className={styles.status_element_container}>
            <span className={styles.status_element}>&bull;&nbsp;Accepted</span>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default OrdersCard;
