import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../../context/Fiebase";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  //Calling hooks
  const fireBase = useFirebase();
  const emailRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();

  //function to handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log("SigningUp a user");
    const result = await fireBase.signingupUser(
      emailRef.current.value,
      passRef.current.value
    );
  };

  useEffect(()=>{
    if(fireBase.user){
        //navigate to home
        navigate("/");
    }
},[fireBase.user]);

  return (
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
          Create Account
        </Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
