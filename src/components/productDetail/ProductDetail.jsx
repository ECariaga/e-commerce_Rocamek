import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import Button from "../button/Button";
import styles from "./ProductDetail.module.css";
import QuantitySelector from "../quantitySelector/QuantitySelector";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const [quantity, setQuantity] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>Error al cargar el producto: {error}</p>;
  if (!product) return <p>Producto no encontrado</p>;

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
                src={product.urlImage}
                alt={product.title}
                className={styles.mainImage}
              />
            </div>
            <div className={styles.secondaryImg}>
              {product.secondaryImages &&
                product.secondaryImages.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Imagen secundaria ${index + 1}`}
                    className={styles.productThumbItem}
                  />
                ))}
            </div>
          </>
        )}
      </div>

      <div className={styles.contentSection}>
        <h2>{product.title}</h2>
        <p className={styles.price}>${product.price}</p>
        <p>{product.description}</p>
        <div className={styles.amount}>
          <label htmlFor="amount">Cantidad:</label>
          <QuantitySelector value={quantity} onChange={setQuantity} />
        </div>

        <Button text={"Agregar al carrito"} />
      </div>
    </div>
  );
};

export default ProductDetail;
