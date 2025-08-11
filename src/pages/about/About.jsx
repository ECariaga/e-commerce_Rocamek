import styles from "./About.module.css";

const About = () => {
  return (
    <>
      <div className={styles.aboutContainer}>
        <div className={styles.heroImage}>
          <div className={styles.heroText}>
            <h1>Sobre nosotros</h1>
            <p>Descubre quiénes somos y nuestra pasión por la aventura.</p>
          </div>
        </div>
        <div className={styles.contentContainer}>
          <section className={styles.aboutSection}>
            <div className={styles.aboutHistory}>
              <h2>¿Quiénes somos?</h2>
              <p>
                En Rocamek todo comenzó como una ilusión familiar. Entre salidas
                de campamento, caminatas por la montaña y tardes enteras
                explorando la naturaleza, descubrimos que lo que más nos unía
                eran esas aventuras al aire libre. Con el tiempo, quisimos
                compartir esa pasión y ayudar a que más personas pudieran vivir
                experiencias así, con el equipo adecuado y la tranquilidad de
                estar preparados.
              </p>
              <p>
                Somos una empresa familiar dedicada a ofrecer equipamiento de
                alta calidad para actividades outdoor. Conocemos de primera mano
                lo que significa cargar una mochila durante horas, montar un
                campamento bajo la lluvia o depender de un buen cuchillo en
                medio de la nada. Por eso, seleccionamos cada producto pensando
                en su resistencia, practicidad y utilidad real: desde mochilas
                impermeables y pulseras paracord, hasta kits de supervivencia,
                cuchillos tácticos y botellas térmicas que acompañan cada ruta.
              </p>
              <p>
                En Rocamek creemos que la naturaleza es un lugar para descubrir,
                aprender y reconectar con lo importante. Nos gusta pensar que,
                cada vez que alguien recibe un pedido nuestro, no está comprando
                solo un producto, sino una herramienta para crear recuerdos y
                vivir momentos que se atesoran para siempre.
              </p>
              <p>
                Más que una tienda, somos una comunidad de aventureros que
                comparten la misma pasión por explorar. Y aunque hoy llegamos a
                clientes de muchos lugares, seguimos trabajando con la misma
                dedicación y trato cercano que cuando empezamos, porque en
                nuestra familia sabemos que las mejores aventuras se viven
                juntos.
              </p>
            </div>
          </section>
          <section className={styles.misionSection}>
            <div className={styles.misionContent}>
              <h2>Misión</h2>
              <p>
                Brindar a los entusiastas del outdoor productos de alta calidad
                que les permitan disfrutar de la naturaleza con seguridad y
                confianza, promoviendo un estilo de vida activo y sostenible.
              </p>
            </div>
            <img
              className={styles.misionImg}
              src="./src/assets/images/mision-image.jpg"
              alt="Imagen de la misión"
            />
          </section>
          <section className={styles.visionSection}>
            <img
              className={styles.visionImg}
              src="./src/assets/images/vision-image.jpg"
              alt="Imagen de la vision"
            />
            <div className={styles.visionContent}>
              <h2>Visión</h2>
              <p>
                Ser la marca líder en equipamiento para aventuras al aire libre
                en Chile, destacándonos por nuestra innovación, compromiso con
                el medio ambiente y conexión con nuestra comunidad de
                exploradores.
              </p>
            </div>
          </section>

          <section className={styles.valuesSection}>
            <div className={styles.valuesContent}>
              <h2>Nuestros Valores</h2>
              <div className={styles.valuesCard}>
                <div className={styles.card}>
                  <h4>🌱SOSTENIBILIDAD</h4>
                  <p>
                    Nos comprometemos con el medio ambiente usando materiales
                    ecológicos.
                  </p>
                </div>
                <div className={styles.card}>
                  <h4>⚡ Innovación</h4>
                  <p>
                    Buscamos las últimas tecnologías en equipo de supervivencia.
                  </p>
                </div>
                <div className={styles.card}>
                  <h4>🤝 Comunidad</h4>
                  <p>
                    Apoyamos a exploradores y aventureros con contenido y
                    asesoría.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
