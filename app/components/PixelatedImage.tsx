import { useRef, useEffect } from "react";
import usePixelatedImage from "./hooks/usePixelatedImage";

interface PixelatedImageProps {
  imageUrl: string;
  pixelSize: number;
}

export default function PixelatedImage({ imageUrl, pixelSize }: PixelatedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Asegúrate de que canvasRef no es null usando el operador de aserción no nula
  usePixelatedImage(canvasRef as React.RefObject<HTMLCanvasElement>, imageUrl, pixelSize);

  return <canvas ref={canvasRef} height={300} className="w-full h-full object-cover" />;
}
