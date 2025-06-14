import { deleteUser } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useCart } from "../context/CartContext";

export function useDeleteAccount() {
  const { setIsDeletingAccount } = useCart();

  const deleteAccount = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("No hay un usuario actualmente autenticado.");
      return;
    }

    try {
      const uid = user.uid;

      setIsDeletingAccount(true);
      await deleteDoc(doc(db, "carts", uid));
      await deleteDoc(doc(db, "users", uid));
      await deleteUser(user);

      window.location.href = "/";
      alert("Cuenta eliminada exitosamente.");
    } catch (error) {
      console.error("Error deleting account:", error);

      if (error.code === "auth/requires-recent-login") {
        alert("Por favor, vuelve a iniciar sesión para eliminar tu cuenta.");
      }

      setIsDeletingAccount(false);
    }
  };

  return deleteAccount;
}
