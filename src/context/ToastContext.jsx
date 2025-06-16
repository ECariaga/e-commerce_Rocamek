/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from "react";
import Toast from "../components/toast/Toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toastProps, setToastProps] = useState({
    open: false,
    title: "",
    message: "",
    variant: "success",
    duration: 4000,
  });

  const showToast = useCallback(
    ({ title, message, variant = "success", duration = 4000 }) => {
      setToastProps({
        open: true,
        title,
        message,
        variant,
        duration,
      });
    },
    []
  );

  const closeToast = () => {
    setToastProps((prev) => ({ ...prev, open: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast {...toastProps} onClose={closeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
