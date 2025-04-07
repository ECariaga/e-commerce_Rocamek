import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Category from "./pages/category/Category";
import ProductDetail from "./components/productDetail/ProductDetail";
import ProductsByCategory from "./components/productsByCategory/ProductsByCategory";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchResults from "./pages/searchResults/SearchResults";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/categories" element={<Category />}></Route>
          <Route path="/item/:id" element={<ProductDetail />}></Route>
          <Route path="/search" element={<SearchResults />}></Route>
          <Route
            path="/products-by-category/:categoryName"
            element={<ProductsByCategory />}
          />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
