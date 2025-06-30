import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../login/Login.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (value) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(isValid ? null : "Formato de email inválido");
  };

  const validatePassword = (value) => {
    const isValid = /^(?=.*[a-z])[A-Za-z\d@$!%*?&]{6,}$/.test(value);
    setPasswordError(
      isValid
        ? null
        : "La contraseña debe tener al menos 6 caracteres y una mayúscula"
    );
  };

  // Para cambiar los estilos de los inputs según si su contenido cumple con las validaciones

  const getInputClass = (value, stateError) => {
    if (value === "") return styles.loginInput;
    return `${styles.loginInput} ${
      stateError === null ? styles.valid : styles.invalid
    }`;
  };

  // Para mostrar los mensajes de error de los input
  const renderError = (value, inputError) => {
    if (value === "" || !inputError) return null;
    return <span className={styles.error}>{inputError}</span>;
  };

  const handleError = (code, message) => {
    switch (code) {
      case "auth/wrong-password":
        return "Correo o contraseña incorrectos.";
      case "auth/user-not-found":
        return "Correo o contraseña incorrectos.";
      case "auth/invalid-credential":
        return "Correo o contraseña incorrectos.";
      case "auth/invalid-email":
        return "Por favor valida que el correo electrónico este escrito correctamente.";
      case "auth/weak-password":
        return "La contraseña debe tener al menos 6 caracteres.";
      case "auth/email-already-in-use":
        return "La dirección de correo electrónico ya se encuentra en uso.";
      default:
        return message;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      const errorMessage = handleError(err.code, err.message);
      setError(errorMessage);
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
                onChange={(e) => {
                  const val = e.target.value;
                  setEmail(val);
                  validateEmail(val);
                }}
                required
                className={getInputClass(email, emailError)}
              />
              {renderError(email, emailError)}
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
                  onChange={(e) => {
                    const val = e.target.value;
                    setPassword(val);
                    validatePassword(val);
                  }}
                  required
                  className={getInputClass(password, passwordError)}
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
              {renderError(password, passwordError)}
            </label>
          </div>
          {error && <span className={styles.error}>{error}</span>}
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
