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
  const hasMeta = Boolean(price);
  const isFull = variant === "full";

  return (
    <article className={`${styles.card} ${styles[variant]} ${!hasMeta ? styles.noPrice : ""}`}>
      {/* Image preview */}
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} crossOrigin="anonymous" />
      </div>

      {/* Card text and price */}
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>

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
      {isFull && hasMeta && (
        <Button className={styles.buyBtn} type="button">
          Buy
        </Button>
      )}
    </article>
  );
}