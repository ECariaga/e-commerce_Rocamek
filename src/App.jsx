import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Category from "./pages/category/Category";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
