import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Testimonials.module.css";
import mujer1 from "../../assets/images/Mujer.jpg";
import hombre1 from "../../assets/images/hombre-1.jpg";
import hombre2 from "../../assets/images/hombre-2.jpg";
import mujer2 from "../../assets/images/Mujer-2.png";

const testimonials = [
  {
    name: "Tatiana Jiménez",
    image: mujer1,
    rating: 5,
    review:
      "El cuchillo de supervivencia superó mis expectativas. Viene afilado, con funda resistente y un agarre que no resbala. Lo probé cortando cuerda, madera y hasta para preparar comida en el campamento.",
  },
  {
    name: "Cristóbal Fuertes",
    image: hombre1,
    rating: 4,
    review:
      "Compré una mochila impermeable para mis excursiones en kayak. Aguantó perfectamente bajo lluvia intensa y hasta una caída al agua. Único detalle: el cierre podría ser un poco más suave, pero cumple su función al 100%.",
  },
  {
    name: "Enrique Moran",
    image: hombre2,
    rating: 4,
    review:
      "La botella térmica mantiene el café caliente por horas, incluso en plena caminata invernal. Es resistente y fácil de limpiar. Lo único que cambiaría es que tuviera un sistema de apertura más rápido para beber sobre la marcha.",
  },
  {
    name: "María González",
    image: mujer2,
    rating: 5,
    review:
      "La pulsera paracord es una maravilla. La usé para improvisar una cuerda en plena ruta de montaña y me salvó de un buen apuro. Además, es ligera y se ve genial como accesorio.",
  },
];

const TestimonialCard = ({ name, image, rating, review }) => {
  return (
    <div className={styles.testimonialCard}>
      <img src={image} alt={name} className={styles.testimonialImage} />
      <h3>{name}</h3>
      <div className={styles.stars}>
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={
              index < rating ? `${styles.star} ${styles.filled}` : styles.star
            }
          >
            ★
          </span>
        ))}
      </div>
      <p>{review}</p>
    </div>
  );
};

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Muestra 3 tarjetas en pantallas grandes
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // En pantallas medianas (menos de 1024px), muestra 2 tarjetas
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // En pantallas pequeñas (menos de 768px), muestra 1 tarjeta
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className={styles.testimonialsSection}>
      <h2>OPINIONES DE CLIENTES</h2>
      <Slider {...settings} className={styles.testimonialsSlider}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </Slider>
    </section>
  );
};

export default Testimonials;
