import styles from "./Button.module.css";

/**
 * Reusable Button component.
 * Supports: variant ("primary" | "secondary" | "ghost"), size ("sm" | "md" | "lg"),
 * and all native button attributes via rest props spread.
 */
export default function Button({
  children,
  className = "",
  type = "button",
  variant = "primary",
  size = "md",
  ...props
}) {
  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
