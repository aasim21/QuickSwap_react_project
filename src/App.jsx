import { Route, Routes } from 'react-router-dom'

//Components

//Pages
import Listings from './pages/ListingPage/Listings';
import LoginPage from './pages/LoginPage/Login';
import HomePage from './pages/HomePage/Home';
import ItemDetail from './pages/ItemDetail/ItemDetail';
import ViewOrderDetails from './pages/ViewOrderDetails/ViewOrderDetails';
import PlacedOrdersPage from './pages/PlacedOrders/PlacedOrders';

//CSS
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import OrdersPage from './pages/OrdersPage/OrdersPage';
import SignUp from './pages/SignUp/SignUp';
import Auth from './pages/AuthPage/Auth';


function App() {

  return (
    <Routes>
      <Route path = "/" element = {<HomePage />} />
      <Route path = "/item/list" element = {<Listings />}/>
      <Route path = "/items/orders" element = {<OrdersPage/>} />
      <Route path = "/item/view/:itemID" element = {<ItemDetail />} />
      <Route path = "/items/orders/:itemID" element = {<ViewOrderDetails />} />
      <Route path = "/items/placedorders" element = {<PlacedOrdersPage />} />
      <Route path = "/auth" element = {<Auth />} >
         <Route path = "signup" element = {<SignUp />} />
         <Route path = "login" element = {<LoginPage />} />
      </Route>
    </Routes>
     

  )
}

export default App
