//styles
import styles from "./PlacedOrdersCard.module.css";

//Hooks
import { useFirebase } from "../../context/Fiebase";
import { useNavigate } from "react-router-dom";

//Importing Icon
import { MdDeleteForever } from "react-icons/md";

//Functional Component
const PlacedOrdersCard = (props) => {
  console.log(props);
  const navigate = useNavigate();
  const fireBase = useFirebase();
  //handling delete btn
  const handleDeleteBtn = async (itemId) => {
    console.log("delete btn pressed");
    await fireBase.handledeleteplaced_order(itemId, fireBase.user.uid);
    const result = await fireBase.getPlacedOrders(fireBase.user.uid);
    props.setPlacedOrders(result);
  };
  return (
    <div className={styles.t_items_container}>
      <div className={`${styles.title_container} ${styles.t_items}`}>
        <img className={styles.img} src={props.imageURL} alt="" />
        <span className={styles.title}>{props.title}</span>
      </div>
      <span className={styles.t_items}>&#8377; {props.price}</span>
      <span
        className={`${styles.t_items} ${styles.status}`}
        style={{
          border: `1px solid ${props.color}`,
          color: props.color,
          backgroundColor: props.bgColor,
        }}
      >
        &bull;&nbsp;
        {props.status === "pending"
          ? "Pending"
          : props.status === "true"
          ? "Accepted"
          : "Rejected"}
      </span>
      <button
        className={`${styles.btn} ${styles.t_items}`}
        onClick={() => navigate(`/item/view/${props.itemID}`)}
      >
        View
      </button>

      {props.status !== "pending" && (
        <button
          className={styles.delete_btn}
          onClick={() => handleDeleteBtn(props.id)}
        >
          <MdDeleteForever />
        </button>
      )}
    </div>
  );
};

export default PlacedOrdersCard;

//  <Card styles={{ width: "18rem" }}>
//       <Card.Img
//         styles={{ height: "12rem", width: "100%" }}
//         variant="top"
//         src={props.imageURL}
//       />
//       <Card.Body>
//         <Card.Title className={styless.title}>{props.title}</Card.Title>
//         <Card.Text className={styless.description}>{props.desc}</Card.Text>
//         <Card.Text className={styless.price}>
//           <span>&#8377;</span>
//           {props.price}
//         </Card.Text>
//         {props.status == "pending" ? (
//           <p>
//             Your order is in <Button variant="warning">Pending</Button> state.
//           </p>
//         ) : (
//           <div>
//             <p>
//               Your order has been{" "}
//               {props.status == "true" ? (
//                 <Button variant="success">Accepted</Button>
//               ) : (
//                 <Button variant="danger">Rejected</Button>
//               )}
//             </p>
//             <Button
//               variant="info"
//               onClick={() => {
//                 handleDeleteBtn(props.id);
//               }}
//             >
//               Delete
//             </Button>
//           </div>
//         )}
//       </Card.Body>
//     </Card>
