import styles from "./Profile.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import regionsData from "../../utils/communes-regions.json";

const EditProfile = () => {
  const { user, loadingUser } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");

  const [regionSelected, setRegionSelected] = useState("");
  const [communeList, setCommuneList] = useState([]);
  const [communeSelected, setCommuneSelected] = useState("");

  const [error, setError] = useState("");

  const handleRegionChange = (e) => {
    const regionName = e.target.value;
    setRegionSelected(regionName);

    const regionObj = regionsData.regiones.find((r) => r.region === regionName);
    setCommuneList(regionObj ? regionObj.comunas : []);
    setCommuneSelected(""); //Reinicia la comuna si cambia la region
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          name: name.trim() !== "" ? name : user.name,
          address,
          code,
          phone,
          region: regionSelected,
          commune: communeSelected,
        },
        { merge: true }
      );
      //Redirigira al perfil después de actualizar con un status
      navigate("/my-profile?status=updated");
    } catch (error) {
      setError(error.message);
      console.error("Error actualizando el perfil:", error);
      //Redirigira al perfil después en caso que de ocurra un error
      navigate("/my-profile?status=error");
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setAddress(user.address || "");
      setCode(user.code || "");
      setPhone(user.phone || "");
      setRegionSelected(user.region || "");
      setCommuneSelected(user.commune || "");

      // También actualizamos la lista de comunas si ya tiene una región guardada
      const regionObj = regionsData.regiones.find(
        (r) => r.region === user.region
      );
      setCommuneList(regionObj ? regionObj.comunas : []);
    }
  }, [user]);

  if (loadingUser) {
    return <p>Cargando datos del usuario...</p>;
  }

  return (
    <div className={styles.container}>
      <h1>Mi Perfil</h1>
      <div className={styles.infoContainer}>
        <h2>Información personal</h2>
        <form onSubmit={handleUpdateProfile}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">
              Nombre y apellido
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">
              Correo electrónico
              <input
                type="email"
                id="email"
                name="email"
                placeholder={user.email}
                disabled
              />
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="location">
              Dirección
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                placeholder="Ingrese su dirección"
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="code">
              Código postal (opcional)
              <input
                type="text"
                id="code"
                name="code"
                value={code}
                placeholder="Ingrese un código postal"
                onChange={(e) => setCode(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="region">
              Región
              <select value={regionSelected} onChange={handleRegionChange}>
                <option value=""> Selecciona una región</option>
                {regionsData.regiones.map((region) => (
                  <option key={region.region} value={region.region}>
                    {region.region}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="commune">
              Comuna
              <select
                disabled={!regionSelected}
                value={communeSelected}
                onChange={(e) => setCommuneSelected(e.target.value)}
              >
                <option value="">Seleccione una comuna</option>
                {communeList.map((commune) => (
                  <option key={commune} value={commune}>
                    {commune}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="phone">
              Teléfono
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                placeholder="Ingrese un teléfono"
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
          </div>
          {error && <p>{error}</p>}
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>
              Guardar cambios
            </button>
            <Link to={"/my-profile"} className={styles.button}>
              Volver
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
