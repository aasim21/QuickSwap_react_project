import styles from "./OrdersCard.module.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { useFirebase } from "../../context/Fiebase";
const OrdersCard = (props) => {
  const fireBase = useFirebase();
  //handling Order rejection
  const handleOrderRejected = async(orderId, itemId, userId) => {
    await fireBase.deleteOrderRequest(orderId, itemId);
    await fireBase.handleOrderRejection(itemId, userId);
    await fireBase.getOrders(itemId);
  };

  //handling Order Acceptance
  const handleOrderAccepted = async(orderId, itemId, userId) =>{
    await fireBase.handleOrderAcceptedVal(itemId, userId);
    await fireBase.handleOrderAccepted(orderId, itemId);
    await fireBase.changeIsSoldVal(itemId);
    await fireBase.getOrders(itemId);
  }
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>Buyer Email: </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {props.userEmail}
        </Card.Subtitle>
        {
            props.hasSold == "pending" ? (<div style={{ marginTop: "1rem" }}>
              <Button onClick = {() => {
                handleOrderAccepted(props.id, props.itemId, props.userID);
              }} style={{ marginRight: "0.3rem" }} variant="success">
                Accept
              </Button>
              <Button variant="danger" onClick = {() => {
                handleOrderRejected(props.id, props.itemId, props.userID);
              }}>Reject</Button>
            </div>) : (<div style={{ marginTop: "1rem" }}>
              <Button style={{ marginRight: "0.3rem" }} variant="success">
                Accepted
              </Button>
            </div>)
          }
        
      </Card.Body>
    </Card>
  );
};

export default OrdersCard;
