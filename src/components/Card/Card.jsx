import styles from "./Card.module.css";
import Button from "../Button/Button";

export default function Card({ art, variant = "default" }) {
  const { name, price, image } = art;
  const hasPrice = Boolean(price);
  const isFull = variant === "full";

  return (
    <article className={`${styles.card} ${styles[variant]} ${!hasPrice ? styles.noPrice : ""}`}>
      {/* Image preview */}
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} crossOrigin="anonymous" />
      </div>

      {/* Card text and price */}
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>

        {hasPrice && (
          <>
            <hr className={styles.hr} />
            <div className={styles.details}>
              <span className={styles.price}>{price}$</span>
            </div>
          </>
        )} 
      </div>

      {/* Full variant action area */}
      {isFull && hasPrice && (
        <Button className={styles.buyBtn} type="button">
          Buy
        </Button>
      )}
    </article>
  );
}