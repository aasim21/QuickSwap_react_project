//CSS
import styles from "../Card/Card.module.css";

//Components
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

//Hooks
import { useFirebase } from "../../context/Fiebase";
//Functional Component
const PlacedOrdersCard = (props) => {
  const fireBase = useFirebase();
  //handling delete btn
  const handleDeleteBtn = async (itemId) => {
    console.log("delete btn pressed");
    await fireBase.handledeleteplaced_order(itemId, fireBase.user.uid);
    await fireBase.getPlacedOrders(fireBase.user.uid);
  };
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        style={{ height: "12rem", width: "100%" }}
        variant="top"
        src={props.imageURL}
      />
      <Card.Body>
        <Card.Title className={styles.title}>{props.title}</Card.Title>
        <Card.Text className={styles.description}>{props.desc}</Card.Text>
        <Card.Text className={styles.price}>
          <span>&#8377;</span>
          {props.price}
        </Card.Text>
        {props.status == "pending" ? (
          <p>
            Your order is in <Button variant="warning">Pending</Button> state.
          </p>
        ) : (
          <div>
            <p>
              Your order has been{" "}
              {props.status == "true" ? (
                <Button variant="success">Accepted</Button>
              ) : (
                <Button variant="danger">Rejected</Button>
              )}
            </p>
            <Button
              variant="info"
              onClick={() => {
                handleDeleteBtn(props.id);
              }}
            >
              Delete
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default PlacedOrdersCard;
