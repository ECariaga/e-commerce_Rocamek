import styles from "./QuantitySelector.module.css"; // Archivo de estilos

const QuantitySelector = ({ value, onChange }) => {
  return (
    <div className={styles.quantitySelector}>
      <button
        className={styles.btn}
        onClick={() => onChange(Math.max(1, value - 1))}
      >
        -
      </button>
      <input
        type="number"
        className={styles.input}
        value={value}
        onChange={(e) => {
          const newValue = Math.max(1, parseInt(e.target.value) || 1);
          onChange(newValue);
        }}
      />
      <button className={styles.btn} onClick={() => onChange(value + 1)}>
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
