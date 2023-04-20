/**
 * Import Components
 */
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import UserAuthRoute from "./routes/UserAuthRoute";
import UserRoute from "./routes/UserRoute";
import Public from "./routes/Public";
import Private from "./routes/Private";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import AuthForm from "./pages/AuthForm";
import Home from "./pages/Home";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import CatProducts from "./pages/CatProducts";
import Profile from "./pages/Profile";
import DetailProduct from "./pages/DetailProduct";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import UserOrders from "./pages/UserOrders";
import ErrorNotFound from "./pages/ErrorNotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminProducts from "./pages/admin/AdminProducts";

function Routers() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products/:name" element={<CatProducts />} />
        <Route path="products/:name/:page" element={<CatProducts />} />
        <Route path="cart" element={<Cart />} />
        <Route element={<UserAuthRoute />}>
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
        </Route>
        <Route element={<UserRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<UserOrders />} />
          <Route path="orders/:page" element={<UserOrders />} />
        </Route>
        <Route path="products" element={<Products />} />
        <Route path="product/:name" element={<DetailProduct />} />
        <Route path="*" element={<ErrorNotFound />} />
        <Route path="admin">
          <Route
            path="login"
            element={
              <Public>
                <AdminLogin />
              </Public>
            }
          />
          <Route
            path="products"
            element={
              <Private>
                <AdminProducts />
              </Private>
            }
          />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Routers;
