import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <div>
      <button
        className={styles.buttonDesign}
        type="button"
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </div>
  );
};

export default Button;
