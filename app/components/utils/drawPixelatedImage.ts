import type { RefObject } from "react";

export default function drawPixelatedImage(
  canvasRef: RefObject<HTMLCanvasElement>,
  img: HTMLImageElement,
  pixelSize: number
) {
  const canvas = canvasRef.current;
  if (!canvas) return; // Si no hay canvas, salimos

  const ctx = canvas.getContext("2d");
  if (!ctx) return; // Si no hay contexto, salimos

  const w = canvas.width;
  const h = canvas.height;

  // Dibujamos la imagen en el canvas
  ctx.drawImage(img, 0, 0, w, h);

  // Obtenemos los datos de la imagen (colores de cada píxel)
  const imageData = ctx.getImageData(0, 0, w, h).data;

  // Recorremos la imagen en bloques de tamaño pixelSize
  for (let y = 0; y < h; y += pixelSize) {
    for (let x = 0; x < w; x += pixelSize) {
      const pos = (y * w + x) * 4; // Calculamos la posición del píxel
      const r = imageData[pos]; // Componente rojo
      const g = imageData[pos + 1]; // Componente verde
      const b = imageData[pos + 2]; // Componente azul

      // Dibujamos un cuadrado del color promedio del bloque
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x, y, pixelSize, pixelSize);
    }
  }
}