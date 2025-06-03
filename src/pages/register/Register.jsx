import { useState } from "react";
import { db, auth } from "../../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../register/Register.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });
      //Guardar usuario en Firestore con rol
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        role: "cliente", //rol por defecto
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerContainer}>
        <h1>Registrarse</h1>
        <form onSubmit={handleRegister}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">
              Nombre y apellido:
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder="Ingrese su nombre y apellido"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">
              Correo electrónico:
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Ingrese su correo electrónico"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">
              Contraseña:
              <div className={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Ingrese su contraseña"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.eyeButton}
                  aria-label="Mostrar u ocultar contraseña"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </label>
          </div>
          {error && <p>{error}</p>}
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>
              Crear cuenta
            </button>
          </div>
        </form>
        <Link to={"/login"} className={styles.linkToLogin}>
          Ya tengo una cuenta
        </Link>
      </div>
    </div>
  );
}

export default Register;
