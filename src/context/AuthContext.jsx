/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase/config";
import { onSnapshot, doc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        //Suscribirse a camnbios en el documento del usuario
        const unsubscribeUser = onSnapshot(userRef, (userDoc) => {
          const userData = userDoc.exists() ? userDoc.data() : {};
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            ...userData,
          });

          setLoadingUser(false);
        });

        return () => {
          unsubscribeUser();
          setLoadingUser(false);
        };
      } else {
        setUser(null);
        setLoadingUser(false);
      }
    });

    return () => unsubscribeAuth(); //Limpia la suscripcion del auth
  }, []);

  return (
    <AuthContext.Provider value={{ user, loadingUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
