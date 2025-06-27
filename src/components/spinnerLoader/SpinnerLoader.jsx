import { useEffect, useState } from "react";
import spinner from "../../assets/images/spinner.svg";
import styles from "../spinnerLoader/SpinnerLoader.module.css";

const SpinnerLoader = () => {
  const [text, setText] = useState("");
  const [showImg, setShowImg] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowImg(false);
      setText("Ha ocurrido un error al cargar...");
    }, 10000000000);
  }, []);

  return (
    <>
      <div className={styles.container}>
        {showImg ? (
          <img className={styles.spinnerImg} src={spinner} alt="" />
        ) : (
          <p>{text}</p>
        )}
      </div>
    </>
  );
};

export default SpinnerLoader;
