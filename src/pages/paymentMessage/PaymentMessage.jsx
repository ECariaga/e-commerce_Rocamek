import OrderConfirmation from "../../components/orderConfirmation/OrderConfirmation.jsx";
import styles from "../paymentMessage/PaymentMessage.module.css";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentMessage = () => {
  const navigate = useNavigate();
  const [searchParamns] = useSearchParams();

  const status = searchParamns.get("status");
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000); //Espera 10 segundos para redireccionar a inicio

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <OrderConfirmation status={status} />
    </div>
  );
};

export default PaymentMessage;
