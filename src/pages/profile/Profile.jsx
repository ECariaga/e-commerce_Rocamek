import styles from "./Profile.module.css";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  return (
    <div className={styles.container}>
      <h1>Mi Perfil</h1>
      <div className={styles.infoContainer}>
        <h2>Información personal</h2>

        <div className={styles.infoGroup}>
          <p>Nombre y apellido</p>
          <span>{user.name}</span>
        </div>
        <div className={styles.infoGroup}>
          <p>Correo electrónico</p>
          <span>{user.email}</span>
        </div>
        <div className={styles.infoGroup}>
          <p>Dirección</p>
          <span>
            {user.address ? user.address : "No se ha registrado una dirección"}
          </span>
        </div>
        <div className={styles.infoGroup}>
          <p>Código postal</p>
          <span>
            {user.code ? user.code : "No se ha registrado un código postal"}
          </span>
        </div>
        <div className={styles.infoGroup}>
          <p>Región</p>
          <span>
            {user.region ? user.region : "No se ha registrado una región"}
          </span>
        </div>
        <div className={styles.infoGroup}>
          <p>Comuna</p>
          <span>
            {user.commune ? user.commune : "No se ha registrado una comuna"}
          </span>
        </div>
        <div className={styles.infoGroup}>
          <p>Teléfono</p>
          <span>
            {user.phone ? user.phone : "No se ha registrado un teléfono"}
          </span>
        </div>
        <div className={styles.buttonContainer}>
          <Link to={"/edit-profile"} className={styles.button}>
            Modificar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
