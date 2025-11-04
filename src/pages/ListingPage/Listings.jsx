//Components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from '../../components/Navbar/Nav';

//Hooks
import { useRef, useEffect, useState } from 'react';
import { useFirebase } from '../../context/Fiebase';
import { useNavigate } from 'react-router-dom';


const Listings = () =>{
  const [Loading, setIsLoading] = useState(false);
  //Using Context
  const fireBase = useFirebase();
  const navigate = useNavigate();

  //Creating References
  const titleRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();

  useEffect(()=>{
    // console.log(fireBase.isLoggedIn);
     //Checking User Logging in
     if(!fireBase.isLoggedIn){
        navigate("/auth/login");
     }
    },[fireBase.isLoggedIn]);

  //Handling Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const title = titleRef.current.value;
    const desc = descRef.current.value;
    const price = priceRef.current.value;
    const imageURL = imageRef.current.value;
    const res = await fireBase.handleCreateNewListing(title, desc, price, imageURL);
    navigate("/items/orders");
  }

    return(
    <div>   
     <Nav />
     <div className="container mt-5">    
     <Form onSubmit = {handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter your Title</Form.Label>
        <Form.Control  ref = {titleRef} type="text" placeholder="Enter Title here" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword1">
        <Form.Label>Enter Description</Form.Label>
        <Form.Control type="text-box" ref = {descRef} placeholder="Explain your Listing" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword2">
        <Form.Label>Enter Price</Form.Label>
        <Form.Control type="number" ref = {priceRef} placeholder="Enter your price" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Upload photo</Form.Label>
        <Form.Control type="url" ref = {imageRef} placeholder="Upload your cover photo url (eg. https://example.jpg.com)" />
      </Form.Group>
      <div style = {{display:"flex",
                     gap: "1rem"
                  }}>
      <Button variant="primary" type="submit" disabled = {Loading}>
        Add your Listing
      </Button>
      <a href = "https://imgur.com/upload" target = "_blank">
      <Button variant="primary"> 
        Get Image URL
      </Button>
      </a>
      </div>
    </Form>
    </div>
    </div>
    )
}

export default Listings;