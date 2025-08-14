import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import useProduct from "../../hooks/useProduct.jsx";
import Button from "../button/Button.jsx";
import styles from "./ProductDetail.module.css";
import QuantitySelector from "../quantitySelector/QuantitySelector.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import formatPrice from "../../utils/formatPrice.js";
import SpinnerLoader from "../../components/spinnerLoader/SpinnerLoader.jsx";
import { useToast } from "../../context/ToastContext.jsx";

const ProductDetail = () => {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const [quantity, setQuantity] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { cartItems, addToCart } = useCart();
  const { showToast } = useToast(); // Para mostrar notificaciones

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    accessibility: true,
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Reiniciar índice cuando cambia el producto
    if (product) {
      setCurrentIndex(0);
    }
  }, [product]);

  // Autoplay en pantallas grandes
  useEffect(() => {
    if (!isMobile && product?.secondaryImages?.length) {
      const allImages = [product.urlImage, ...product.secondaryImages];
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % allImages.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isMobile, product]);

  const handleAddToCart = () => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    const quantityInCart = existingItem ? existingItem.quantity : 0;
    const availableStock = product?.stock - quantityInCart;

    if (availableStock <= 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return showToast({
        title: "Producto sin stock",
        message: "Este producto ya alcanzó el máximo disponible en tu carrito.",
        variant: "warning",
      });
    }
    if (quantity > availableStock) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return showToast({
        title: "Cantidad excedida",
        message: `Solo puedes agregar ${availableStock} unidad(es) de este producto.`,
        variant: "warning",
      });
    }

    addToCart(product, quantity);

    window.scrollTo({ top: 0, behavior: "smooth" });
    return showToast({
      title: "Producto agregado al carrito",
      message: "",
      variant: "success",
    });
  };

  if (loading) return <SpinnerLoader />;
  if (error) return <p>Error al cargar el producto: {error}</p>;
  if (!product) return <p>Producto no encontrado</p>;

  const allImages = [product.urlImage, ...(product.secondaryImages || [])];

  return (
    <div className={styles.detailContainer}>
      <div className={styles.imagesSection}>
        {isMobile ? (
          <Slider {...sliderSettings} key={product.id}>
            <div>
              <img
                src={product.urlImage}
                alt={product.title}
                className={styles.mainImage}
              />
            </div>
            {product.secondaryImages &&
              product.secondaryImages.map((img, index) => (
                <div className={styles.secondaryImg} key={index}>
                  <img
                    src={img}
                    alt={`Imagen secundaria ${index + 1}`}
                    className={styles.productThumbItem}
                  />
                </div>
              ))}
          </Slider>
        ) : (
          <>
            <div className={styles.mainPhoto}>
              <img
                src={allImages[currentIndex]}
                alt={product.title}
                className={styles.mainImage}
              />
            </div>
            <div className={styles.secondaryImg}>
              {allImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Imagen ${index + 1}`}
                  className={`${styles.productThumbItem} ${
                    currentIndex === index ? styles.activeThumb : ""
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className={styles.contentSection}>
        <h2>{product.title}</h2>
        {product.discountPrice ? (
          <div className={styles.priceSection}>
            <p className={styles.discountPrice}>
              {formatPrice(product.discountPrice)}
            </p>
            <p className={styles.oldPrice}>{formatPrice(product.price)}</p>
          </div>
        ) : (
          <p className={styles.price}>{formatPrice(product.price)}</p>
        )}

        <p className={styles.productDescription}>{product.description}</p>
        <div className={styles.amount}>
          <label htmlFor="amount">Cantidad:</label>
          <QuantitySelector value={quantity} onChange={setQuantity} />
        </div>
        <Button text={"Agregar al carrito"} onClick={handleAddToCart} />
      </div>
    </div>
  );
};

export default ProductDetail;
