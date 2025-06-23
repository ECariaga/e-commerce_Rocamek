import { db } from "../firebase/config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

export function usePlaceOrder() {
  const placeOrder = async (uid, items, total) => {
    if (!uid || items.legth === 0) throw new Error("Orden inválida");

    const order = {
      items,
      total,
      status: "Pendiente",
      createdAt: serverTimestamp(),
      deliveredAt: null,
    };

    //const orderRef = collection(db, "users", uid, "orders");
    await setDoc(doc(db, "orders", uid), { order });
    //await addDoc(orderRef, order);
  };
  return { placeOrder };
}

// Este hook permite crear una orden en Firestore bajo el usuario especificado
