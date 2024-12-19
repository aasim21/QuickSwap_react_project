//Components
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "../../components/Navbar/Nav";
//Hooks
import { useFirebase } from "../../context/Fiebase";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

//Functional Component
const LoginPage = () => {

  //Calling hooks
  const fireBase = useFirebase();
  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();

  //function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fireBase.LoginUser(
      emailRef.current.value,
      passRef.current.value
    );
};
useEffect(()=>{
    if(fireBase.isLoggedIn){
        //navigate to home
        navigate("/home");
    }
},[fireBase.isLoggedIn]);

  return (
    <>
    <Nav />
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={passRef} type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  </>
  );
};

export default LoginPage;
