//Hooks
import { useNavigate } from "react-router-dom";

//style
import styles from "./Card.module.css";

//Functional Component
const CardComp = (props) => {
  const navigate = useNavigate();
  // console.log(props);
  return (
    <div className={styles.main_container}>
      <div className={styles.child_container}>
        <div className={styles.img_container}>
          <img src={props.imageURL} alt="image" />
        </div>
        <div className={styles.info_container}>
          <div className={styles.descriptions}>
            <h4 className={styles.product_title}>{props.title}</h4>
            <p className={styles.desc}>{props.desc}</p>
          </div>
          <div className={styles.price_container}>
            <p className={styles.price}>&#x20B9; {Number(props.price).toLocaleString("en-IN")}</p>
          </div>
        </div>
      </div>
      <button onClick={() => navigate(props.link)} className={styles.btn}>
        View Details
      </button>
    </div>
  );
};

export default CardComp;

