import { useRef, useEffect } from "react";
import usePixelatedImage from "./hooks/usePixelatedImage";

interface PixelatedImageProps {
  imageUrl: string;
  pixelSize: number;
}

export default function PixelatedImage({ imageUrl, pixelSize }: PixelatedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Comprobar si canvasRef.current no es null antes de ejecutar el hook
  useEffect(() => {
    if (canvasRef.current) {
   
      usePixelatedImage(canvasRef as React.RefObject<HTMLCanvasElement>, imageUrl, pixelSize);
    }
  }, [imageUrl, pixelSize]);

  if (!canvasRef.current) return null;

  return <canvas ref={canvasRef} width={300} height={300} className="w-full h-full object-cover" />;
}
