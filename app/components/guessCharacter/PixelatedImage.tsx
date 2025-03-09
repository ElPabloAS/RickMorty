import { useRef } from "react";
import usePixelatedImage from "../hooks/usePixelatedImage";

interface PixelatedImageProps {
  imageUrl: string;
  pixelSize: number;
}

export default function PixelatedImage({ imageUrl, pixelSize }: PixelatedImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  usePixelatedImage(canvasRef as React.RefObject<HTMLCanvasElement>, imageUrl, pixelSize);

  return <canvas ref={canvasRef} height={300} className="w-full h-full object-cover" />;
}
