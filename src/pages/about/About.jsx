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
                Rocamek nació de la pasión por la aventura y la exploración.
                Somos una empresa dedicada a proporcionar equipamiento de alta
                calidad para actividades al aire libre, asegurando que cada
                expedición sea segura y cómoda. Creemos que la naturaleza es un
                espacio para descubrir, aprender y conectar con lo esencial. Nos
                especializamos en ofrecer productos diseñados para resistir las
                condiciones más exigentes, brindando soluciones confiables a
                quienes buscan superar sus límites y desafiar lo desconocido.
                Desde mochilas y tiendas de campaña hasta herramientas de
                supervivencia, en Rocamek nos aseguramos de que cada artículo
                cumpla con los estándares más altos de calidad. Más que una
                tienda, somos una comunidad de aventureros que comparten la
                misma pasión por la exploración. Nos impulsa la ies confían en
                nosotros para sus viajes y desafíos en la naturaleza.
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
