"use client";

import styles from "./CreateCard.module.css";
import { useRef } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";

/**
 * CreateCard — preview card shown on the /create page after an image is selected.
 * Extracts dominant colour from the uploaded image and uses it as the background.
 *
 * Props:
 *  - image: object URL of the uploaded file (string)
 */
export default function CreateCard({ image }) {
  const imgRef  = useRef(null);

  return (
    <section className={styles.card} aria-label="Artwork preview">
      {/* ── Image preview ── */}
      <div className={styles.imageContainer} >
        {image ? (
          <img
            ref={imgRef}
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