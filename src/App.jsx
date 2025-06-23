import "./App.css";
import Header from "./components/header/Header";
import AuthHeader from "./components/authHeader/AuthHeader";
import Footer from "./components/footer/Footer";
import AuthFooter from "./components/authFooter/AuthFooter";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Category from "./pages/category/Category";
import ProductDetail from "./components/productDetail/ProductDetail";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import PurchaseDetail from "./pages/purchaseDetail/purchaseDetail";
import ProductsByCategory from "./components/productsByCategory/ProductsByCategory";
import { Routes, Route, useLocation } from "react-router-dom";
import SearchResults from "./pages/searchResults/SearchResults";
import { ProductsProvider } from "./context/ProductsContext";
import { CategoriesProvider } from "./context/CategoriesContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

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
