import { useEffect } from "react";
import type { RefObject } from "react";
import drawPixelatedImage from "../utils/drawPixelatedImage";

export default function usePixelatedImage(
  canvasRef: RefObject<HTMLCanvasElement>,
  imageUrl: string,
  pixelSize: number
) {
  useEffect(() => {
    if (!imageUrl || !canvasRef.current) return; // Si no hay imagen o canvas, salimos

    const img = new Image();
    img.crossOrigin = "anonymous"; // Permitimos el acceso a imágenes de otros dominios
    img.onload = () => drawPixelatedImage(canvasRef, img, pixelSize); // Dibujamos la imagen pixelada
    img.src = imageUrl; // Asignamos la URL de la imagen
  }, [imageUrl, pixelSize, canvasRef]); // Dependencias del useEffect
}