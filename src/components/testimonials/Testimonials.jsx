import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Testimonials.module.css"; // Archivo de estilos

const testimonials = [
  {
    name: "Tatiana Jiménez",
    image: "./src/assets/images/Mujer.jpg",
    rating: 5,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porta a dui sed tempor. Vivamus id vestibulum odio.",
  },
  {
    name: "Cristóbal Fuertes",
    image: "./src/assets/images/hombre-1.jpg",
    rating: 4,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porta a dui sed tempor. Vivamus id vestibulum odio.",
  },
  {
    name: "Enrique Moran",
    image: "./src/assets/images/hombre-2.jpg",
    rating: 4,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porta a dui sed tempor. Vivamus id vestibulum odio.",
  },
  {
    name: "María González",
    image: "./src/assets/images/Mujer.jpg",
    rating: 5,
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porta a dui sed tempor. Vivamus id vestibulum odio.",
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
