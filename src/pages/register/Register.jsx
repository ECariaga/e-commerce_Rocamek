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
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateName = (value) => {
    const isValid = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value.trim());
    setNameError(
      isValid
        ? null
        : "El nombre de usuario no puede tener caracteres especiales"
    );
  };

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
    if (value === "") return styles.registerInput;
    return `${styles.registerInput} ${
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
      const errorMessage = handleError(err.code, err.message);
      setError(errorMessage);
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
                onChange={(e) => {
                  const val = e.target.value;
                  setName(val);
                  validateName(val);
                }}
                required
                className={getInputClass(name, nameError)}
              />
              {renderError(name, nameError)}
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
