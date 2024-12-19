import { Route, Routes } from 'react-router-dom'

//Components

//Pages
import Listings from './pages/ListingPage/Listings';
import LoginPage from './pages/LoginPage/Login';
import HomePage from './pages/HomePage/Home';
import ItemDetail from './pages/ItemDetail/ItemDetail';
import ViewOrderDetails from './pages/ViewOrderDetails/ViewOrderDetails';
import RegisterPage from './pages/RegisterPage/Register';
import PlacedOrdersPage from './pages/PlacedOrders/PlacedOrders';
//CSS
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import OrdersPage from './pages/OrdersPage/OrdersPage';


function App() {

  return (
    <Routes>
      <Route path = "/login" element = {<LoginPage />} />
      <Route path = "/register" element = {<RegisterPage />} />
      <Route path = "/home" element = {<HomePage />} />
      <Route path = "/item/list" element = {<Listings />}/>
      <Route path = "/items/orders" element = {<OrdersPage/>} />
      <Route path = "/item/view/:itemID" element = {<ItemDetail />} />
      <Route path = "/items/orders/:itemID" element = {<ViewOrderDetails />} />
      <Route path = "/items/placedorders" element = {<PlacedOrdersPage />} />
    </Routes>
     

  )
}

export default App
