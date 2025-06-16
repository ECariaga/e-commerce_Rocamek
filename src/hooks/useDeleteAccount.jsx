import { deleteUser } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

export function useDeleteAccount() {
  const { setIsDeletingAccount } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const deleteAccount = async () => {
    const user = auth.currentUser;

    if (!user) {
      showToast({
        title: "Error",
        message: "No hay un usuario actualmente autenticado.",
        variant: "error",
      });
      return;
    }

    try {
      const uid = user.uid;

      setIsDeletingAccount(true);
      await deleteDoc(doc(db, "carts", uid));
      await deleteDoc(doc(db, "users", uid));
      await deleteUser(user);

      navigate("/?status=account-deleted"); // Redirige a la página de inicio con un estado de cuenta eliminada
    } catch (error) {
      console.error("Error deleting account:", error);

      if (error.code === "auth/requires-recent-login") {
        showToast({
          title: "Error",
          message:
            "Por favor, vuelve a iniciar sesión para eliminar tu cuenta.",
          variant: "error",
        });

        navigate("/login");
      }

      setIsDeletingAccount(false);
    }
  };

  return deleteAccount;
}
