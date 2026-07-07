export default async function getCroppedImg(imageSrc, crop, outputSize = {}) {
  if (!imageSrc || !crop || typeof crop.width !== "number" || typeof crop.height !== "number") {
    return null;
  }

  const image = new Image();
  image.src = imageSrc;

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const targetWidth = Math.max(1, Math.round(outputSize.width || crop.width));
  const targetHeight = Math.max(1, Math.round(outputSize.height || crop.height));

  canvas.width = targetWidth;
  canvas.height = targetHeight;

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    targetWidth,
    targetHeight
  );

  return new Promise((resolve) => {
    canvas.toBlob(resolve, "image/png");
  });
}