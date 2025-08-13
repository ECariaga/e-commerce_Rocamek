import styles from "./Profile.module.css";
import { useAuth } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import DeleteAccountButton from "../../components/deleteAccountButton/DeleteAccountButton.jsx";
import { useDeleteAccount } from "../../hooks/useDeleteAccount.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import SpinnerLoader from "../../components/spinnerLoader/SpinnerLoader.jsx";

const Profile = () => {
  const { user, loadingUser } = useAuth();
  const location = useLocation();
  const { showToast } = useToast(); // Para mostrar notificaciones

  const deleteAccount = useDeleteAccount();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");

    if (status === "updated") {
      showToast({
        title: "Perfil actualizado",
        message: "Tu perfil ha sido actualizado exitosamente.",
        variant: "success",
      });
    }
    if (status === "error") {
      showToast({
        title: "Error al actualizar",
        message:
          "Ocurrió un error al actualizar tu perfil. Por favor, inténtalo de nuevo.",
        variant: "error",
      });
    }
    if (status) {
      const clearUrl = location.pathname;
      window.history.replaceState({}, document.title, clearUrl);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Desplazar la vista al inicio de la página
    }
  }, [location, showToast]);

  if (loadingUser) {
    return <SpinnerLoader />;
  }

  return (
    <div className={styles.container}>
      <h1>Mi Perfil</h1>
      <div className={styles.infoContainer}>
        <h3>Información personal</h3>

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
      <div className={styles.infoContainer}>
        <div className={styles.deleteAccountContainer}>
          <h3>Eliminar cuenta de usuario</h3>

          <p>
            Al eliminar tu cuenta, perderás todos tus datos y no podrás
            recuperarlos.
          </p>
          <div className={styles.deleteButton}>
            <DeleteAccountButton onDelete={deleteAccount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
