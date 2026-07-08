import styles from "./CreateCard.module.css";
import Button from "../Button/Button";
import Input from "../Input/Input";

export default function CreateCard({ image }) {

  return (
    <section className={styles.card} aria-label="Artwork preview">
      {/* ── Image preview ── */}
      <div className={styles.imageContainer} >
        {image ? (
          <img
            src={image}
            alt="Artwork preview"
            className={styles.image}
          />
        ) : (
          <span className={styles.imagePlaceholder}>No image</span>
        )}
      </div>

      {/* ── Form fields ── */}
      <div className={styles.fields}>
        <Input id="create-name"  placeholder="Artwork name"  label="Name" />
        <Input id="create-price" placeholder="Price in USD"  label="Price ($)" type="number" min="0" />
        <Button type="submit" size="lg" style={{ width: "100%" }}>
          Submit
        </Button>
      </div>
    </section>
  );
}