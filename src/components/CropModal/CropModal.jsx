"use client";

import { useState, useCallback, useEffect } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
import Button from "../Button/Button";
import styles from "./CropModal.module.css";

const ASPECT = 224 / 344;
const OUTPUT_WIDTH = 224;
const OUTPUT_HEIGHT = 344;

export default function CropModal({ image, onCancel, onSave }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [maxZoom, setMaxZoom] = useState(3);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  useEffect(() => {
    if (!image) return;

    const img = new Image();
    img.src = image;

    img.onload = () => {
      const previewWidth = 420;
      const previewHeight = 300;
      const fitZoom = Math.max(previewWidth / img.width, previewHeight / img.height);
      const baseZoom = Math.max(1.4, Math.min(4, fitZoom));
      const computedMaxZoom = Math.max(3, Math.min(8, Math.round(baseZoom * 2 * 100) / 100));

      setZoom(baseZoom);
      setMaxZoom(computedMaxZoom);
      setCrop({ x: 0, y: 0 });
      setCroppedAreaPixels(null);
    };
  }, [image]);

  const handleSave = async () => {
    if (!image || !croppedAreaPixels) return;

    try {
      setIsSaving(true);
      const blob = await getCroppedImg(image, croppedAreaPixels, {
        width: OUTPUT_WIDTH,
        height: OUTPUT_HEIGHT,
      });
      if (blob) {
        onSave(blob);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.cropContainer}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={ASPECT}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            minZoom={1}
            maxZoom={maxZoom}
            showGrid={false}
          />
        </div>

        <div className={styles.sliderRow}>
          <label htmlFor="zoom-slider" className={styles.sliderLabel}>
            Zoom
          </label>
          <input
            id="zoom-slider"
            className={styles.zoomSlider}
            type="range"
            min={1}
            max={maxZoom}
            step={0.01}
            value={zoom}
            onChange={(event) => setZoom(Number(event.target.value))}
          />
        </div>

        <div className={styles.buttons}>
          <Button variant="ghost" size="md" onClick={onCancel}>
            Cancel
          </Button>
          <Button size="md" onClick={handleSave} disabled={isSaving || !croppedAreaPixels}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}