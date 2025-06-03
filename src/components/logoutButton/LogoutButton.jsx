import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  return <button onClick={handleLogout}>Cerrar sesión</button>;
}

export default LogoutButton;
