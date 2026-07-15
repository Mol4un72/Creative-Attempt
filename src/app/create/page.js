"use client";

import { useRef, useState } from "react";
import Button from "@/components/Button/Button";
import styles from "./page.module.css";
import CropModal from "../../components/CropModal/CropModal";
import CreateCard from "../../components/CreateCard/CreateCard";

export default function CreatePage() {
  const [image, setImage] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [file, setFile] = useState(null);
  const [cropOpen, setCropOpen] = useState(false);
  const [dragging, setDragging] = useState(false);

  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;

    setFile(file);
    setCropOpen(true);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const onDragLeave = () => setDragging(false);

  const onDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    handleFile(event.dataTransfer.files[0]);
  };

  return (
    <div className={styles.page}>

      <main className={`${styles.main} ${image ? styles.compact : ""}`}>
        <h1 className={`${styles.pageTitle} ${image ? styles.hidden : ""}`}>
          Create Artwork
        </h1>

        <p className={`${styles.pageSub} ${image ? styles.hidden : ""}`}>
          Upload an image, add a name and price to list it.
        </p>

        {!image ? (
          <div
            className={`${styles.dropzone} ${
              dragging ? styles.dropzoneDragging : ""
            }`}
            role="button"
            tabIndex={0}
            aria-label="Click or drop an image to upload"
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) =>
              e.key === "Enter" && inputRef.current?.click()
            }
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <div className={styles.dropzoneIcon}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>

            <h2 className={styles.dropzoneTitle}>
              Drop your image here
            </h2>

            <p className={styles.dropzoneSub}>
              or <span className={styles.dropzoneLink}>click to browse</span>
            </p>

            <p className={styles.dropzoneHint}>
              PNG, JPG, GIF, WEBP up to 10 MB
            </p>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </div>
        ) : (
          <>
            <CreateCard image={image} blob={imageBlob} />

            <p
              className={styles.changeBtn}
              onClick={() => {
                setImage(null);
                setFile(null);
              }}
            >
              ← Change image
            </p>
          </>
        )}
      </main>

      {cropOpen && file && (
        <CropModal
          image={URL.createObjectURL(file)}
          onCancel={() => {
            setCropOpen(false);
            setFile(null);
          }}
          onSave={(blob) => {
            setImage(URL.createObjectURL(blob));
            setImageBlob(blob);
            setCropOpen(false);
          }}
        />
      )}
    </div>
  );
}