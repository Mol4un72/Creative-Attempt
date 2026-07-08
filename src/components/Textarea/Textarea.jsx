import styles from "./Textarea.module.css";

export default function Textarea({
  placeholder,
  label,
  id,
  rows = 5,
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

      <textarea
        id={id}
        className={[styles.textarea, styles[variant], className].filter(Boolean).join(" ")}
        placeholder={placeholder}
        rows={rows}
        style={{ resize: "none" }}
        {...props}
      />
    </div>
  );
}