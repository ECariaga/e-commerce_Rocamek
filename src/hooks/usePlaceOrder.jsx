import { db } from "../firebase/config.js";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";

export function usePlaceOrder() {
  const placeOrder = async (
    uid,
    items,
    total,
    customerData,
    deliveryMethod
  ) => {
    if (items.length === 0) throw new Error("Orden inválida");

    const order = {
      uid: uid || "invitado",
      items,
      total,
      customerData,
      deliveryMethod,
      status: "Pendiente",
      createdAt: serverTimestamp(),
      deliveredAt: null,
    };

    await addDoc(collection(db, "orders"), order);
  };
  return { placeOrder };
}

// Este hook permite crear una orden en Firestore bajo el usuario especificado
