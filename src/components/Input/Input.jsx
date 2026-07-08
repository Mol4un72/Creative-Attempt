import styles from "./Input.module.css";

export default function Input({
  placeholder,
  type = "text",
  label,
  id,
  variant,
  className = "",
  ...props
}) {
  return (
    <div className={styles.wrapper}>
      {label ? (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      ) : null}

      <input
        id={id}
        className={[styles.input, styles[variant], className].filter(Boolean).join(" ")}
        type={type}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
