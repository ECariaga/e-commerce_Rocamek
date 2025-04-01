import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import Button from "../button/Button";
import styles from "./ProductDetail.module.css";
import QuantitySelector from "../quantitySelector/QuantitySelector";
import Slider from "react-slick"; // Para el carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Estado inicial basado en el ancho de la pantalla

  // Configuración del carrusel
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

  //Para llamar al producto desde Firebase Database
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No se encontró el producto");
        }
      } catch (error) {
        console.error("Error obteniendo producto:", error);
      }
    };

    fetchProduct();
  }, [id]);

  //Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      //console.log("isMobile:", window.innerWidth <= 768); // Depuración
    };
    window.addEventListener("resize", handleResize);
    handleResize(); //Actualizar el estado
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //En el caso que no se carga el producto
  if (!product) {
    return <p>Cargando...</p>;
  }

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
