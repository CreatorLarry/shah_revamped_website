const imageExtensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

// Keep optimized uploads below legacy 10 MB Supabase bucket limits.
const uploadTargetBytes = 9 * 1024 * 1024;
const maximumImageDimension = 3000;

export function getDashboardImageExtension(file: File) {
  return imageExtensions[file.type] ?? "";
}

export async function prepareDashboardImage(file: File) {
  const extension = getDashboardImageExtension(file);
  if (!extension || file.size < 1) {
    throw new Error("Choose a JPG, PNG, WebP or AVIF image.");
  }

  if (file.size <= uploadTargetBytes) return file;

  let image: ImageBitmap;
  try {
    image = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new Error("This large image could not be prepared. Please choose another JPG, PNG, WebP or AVIF file.");
  }

  try {
    const initialScale = Math.min(
      1,
      maximumImageDimension / Math.max(image.width, image.height),
    );
    const canvas = document.createElement("canvas");

    for (const reduction of [1, 0.8, 0.64, 0.48]) {
      const scale = initialScale * reduction;
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Your browser could not prepare this image.");
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      for (const quality of [0.9, 0.8, 0.7, 0.6]) {
        const blob = await canvasToBlob(canvas, quality);
        if (blob.size <= uploadTargetBytes) {
          const baseName = file.name.replace(/\.[^.]+$/, "") || "image";
          return new File([blob], `${baseName}.webp`, {
            type: "image/webp",
            lastModified: file.lastModified,
          });
        }
      }
    }

    throw new Error("This image is too large to prepare safely in the browser.");
  } finally {
    image.close();
  }
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Your browser could not prepare this image."));
      },
      "image/webp",
      quality,
    );
  });
}
