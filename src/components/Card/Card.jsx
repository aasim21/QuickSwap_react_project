import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//Hooks
import { useNavigate } from 'react-router-dom';

//style
import styles from "./Card.module.css"; 

//Functional Component
const CardComp = (props) => {
  const navigate = useNavigate();
  return(
    <>
    <Card style={{ width: '20rem' }}>
      <Card.Img style={{width:"100%",
      height:"18rem"
      }} variant="top" src={props.imageURL}/>
      <Card.Body>
        <Card.Title className = {styles.title}>{props.title}</Card.Title>
        <Card.Text className = {styles.description}>
          {props.desc}
        </Card.Text>
        <Card.Text className = {styles.price}>
          <span>&#8377;</span>{props.price}
        </Card.Text>
        <Button onClick = {(e) => navigate(props.link)} variant="primary">View Details</Button>
      </Card.Body>
    </Card>
    </>
  );
}

export default CardComp;