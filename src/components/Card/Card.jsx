"use client";

import styles from "./Card.module.css";
import Button from "../Button/Button";

/**
 * Card component — displays an artwork tile.
 *
 * Props:
 *  - art: { id, name, price, time, image }
 *  - variant: "default" | "full"
 *    • "default" → compact grid tile (links to detail page)
 *    • "full"    → expanded detail view with bet UI
 */
export default function Card({ art, variant = "default" }) {
  const { name, price, image } = art;
  const hasMeta = price != null;
  const isFull = variant === "full";

  return (
    <article className={`${styles.card} ${styles[variant]}`}>
      {/* Image preview */}
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} crossOrigin="anonymous" />
      </div>

      {/* Card text and price */}
      <div className={styles.info}>
        <p className={`${styles.name} ${!hasMeta ? styles.centerName : ""}`}>{name}</p>

        {hasMeta && (
          <>
            <hr className={styles.hr} />
            <div className={styles.details}>
              <span className={styles.price}>{price}$</span>
            </div>
          </>
        )}
      </div>

      {/* Full variant action area */}
      {isFull && (
        <Button className={styles.buyBtn} type="button">
          Buy
        </Button>
      )}
    </article>
  );
}