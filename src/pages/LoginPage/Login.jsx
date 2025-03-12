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
        navigate("/");
    }
},[fireBase.isLoggedIn]);

  return (
    <>
    </>
  );
};

export default LoginPage;
