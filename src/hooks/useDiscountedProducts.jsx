import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config"; // Asegúrate de que el path es correcto

const useDiscountedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiscountedProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((product) => product.discountPrice); // 🔥 Solo los que tienen descuento

        setProducts(productList);
      } catch (err) {
        console.error("Error obteniendo productos en oferta:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscountedProducts();
  }, []);

  return { products, loading, error };
};

export default useDiscountedProducts;
