import "./App.css";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Men from "./Pages/Men";
import Women from "./Pages/Women";
import Kids from "./Pages/Kids";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import Cart from "./Components/Cart";
import Register from "./Pages/Register";
import Payment from "./Pages/Payment";
import AdminNavbar from "./Admin/AdminNavbar";
import AdminUser from "./Admin/AdminUser";
import AdminProduct from "./Admin/AdminProduct";
import AdminHome from "./Admin/AdminHome";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="men" element={<Men />} />
            <Route path="women" element={<Women />} />
            <Route path="kids" element={<Kids />} />
            <Route path="footer" element={<Footer />} />
            <Route path="cart" element={<Cart />} />
          </Route>
          <Route path="payment" element={<Payment />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="/admin" element={<AdminNavbar />}>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/product" element={<AdminProduct />} />
            <Route path="/admin/user" element={<AdminUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
