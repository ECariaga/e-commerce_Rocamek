import "./App.css";
import Header from "./components/header/Header.jsx";
import AuthHeader from "./components/authHeader/AuthHeader.jsx";
import Footer from "./components/footer/Footer.jsx";
import AuthFooter from "./components/authFooter/AuthFooter.jsx";
import Home from "./pages/home/Home.jsx";
import Products from "./pages/products/Products.jsx";
import About from "./pages/about/About.jsx";
import Contact from "./pages/contact/Contact.jsx";
import Category from "./pages/category/Category.jsx";
import ProductDetail from "./components/productDetail/ProductDetail.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Profile from "./pages/profile/Profile.jsx";
import EditProfile from "./pages/profile/EditProfile.jsx";
import PurchaseDetail from "./pages/purchaseDetail/PurchaseDetail.jsx";
import PaymentMessage from "./pages/paymentMessage/PaymentMessage.jsx";
import ProductsByCategory from "./components/productsByCategory/ProductsByCategory.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import SearchResults from "./pages/searchResults/SearchResults.jsx";
import { ProductsProvider } from "./context/ProductsContext.jsx";
import { CategoriesProvider } from "./context/CategoriesContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";

function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <>
      <AuthProvider>
        <ProductsProvider>
          <CategoriesProvider>
            <CartProvider>
              <ToastProvider>
                {!isAuthPage ? <Header /> : <AuthHeader />}

                <Routes>
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/products" element={<Products />}></Route>
                  <Route path="/about" element={<About />}></Route>
                  <Route path="/contact" element={<Contact />}></Route>
                  <Route path="/categories" element={<Category />}></Route>
                  <Route path="/item/:id" element={<ProductDetail />}></Route>
                  <Route path="/search" element={<SearchResults />}></Route>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/register" element={<Register />}></Route>
                  <Route path="/my-profile" element={<Profile />}></Route>
                  <Route path="/edit-profile" element={<EditProfile />}></Route>
                  <Route
                    path="/purchase-detail"
                    element={<PurchaseDetail />}
                  ></Route>
                  <Route
                    path="/payment-message"
                    element={<PaymentMessage />}
                  ></Route>
                  <Route
                    path="/products-by-category/:categoryName"
                    element={<ProductsByCategory />}
                  />
                </Routes>
                {!isAuthPage ? <Footer /> : <AuthFooter />}
              </ToastProvider>
            </CartProvider>
          </CategoriesProvider>
        </ProductsProvider>
      </AuthProvider>
    </>
  );
}

export default App;
