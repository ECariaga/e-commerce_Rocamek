/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false); // indica si el carrito fue cargado desde Firestore
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  // Cargar carrito desde Firestore cuando cambia el usuario
  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        setCartItems([]);
        setCartLoaded(false);
        return;
      }

      try {
        const cartRef = doc(db, "carts", user.uid);
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
          setCartItems(cartSnap.data().items || []);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCartItems([]);
      } finally {
        setCartLoaded(true); // Solo después de terminar la carga
      }
    };

    fetchCart();
  }, [user]);

  // Guardar carrito en Firestore cuando cambia
  useEffect(() => {
    if (!user || !cartLoaded || isDeletingAccount) return; // Solo guardar cuando el carrito ha sido cargado

    const saveCart = async () => {
      try {
        await setDoc(doc(db, "carts", user.uid), { items: cartItems });
      } catch (error) {
        console.error("Error saving cart:", error);
      }
    };

    saveCart();
  }, [cartItems, user, cartLoaded, isDeletingAccount]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    if (user) {
      setDoc(doc(db, "carts", user.uid), { items: [] });
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        setIsDeletingAccount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
