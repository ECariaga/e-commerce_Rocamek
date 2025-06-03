import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../login/Login.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h1>Inicio de Sesión</h1>
        <form onSubmit={handleLogin}>
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
              Iniciar sesión
            </button>
          </div>
        </form>
        <Link to={"/register"} className={styles.linkToRegister}>
          Quiero registrarme
        </Link>
      </div>
    </div>
  );
}

export default Login;
