import { useState } from "react";
import PixelatedImage from "./PixelatedImage";
import type { Character } from "../interfaces/character";

const PIXEL_SIZE = [ 20 ,15, 10, 5, 1]; // Tamaños de píxel disponibles
const LIVES = 5; // Vidas iniciales

export default function GuessCharacter({
  character,
}: {
  character: Character;
}) {
  const [userGuess, setUserGuess] = useState("");
  const [message, setMessage] = useState("");
  const [lives, setLives] = useState(LIVES); // Vidas iniciales
  const [gameOver, setGameOver] = useState(false); // Para saber si el juego ha terminado
  const [pixelSizeIndex, setPixelSizeIndex] = useState(0); // Índice del tamaño de píxel (inicia en el primer valor de la lista PIXEL_SIZE)

  // Cargar la racha de victorias desde el localStorage en el navegador
  const [streak, setStreak] = useState(() => {
    if (typeof window !== "undefined") {
      const savedStreak = localStorage.getItem("streak");
      return savedStreak ? parseInt(savedStreak, 10) : 0;
    }
    return 0;  
  });

  // Función que maneja el cambio del input
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserGuess(event.target.value);
  };

  // Función para verificar la adivinanza
  const handleCheckClick = () => {
    if (userGuess.trim().toLowerCase() === character.name.toLowerCase()) {
      setMessage(`Correct! The character is ${character.name}.`);
      setGameOver(true);
      setStreak((prevStreak) => {
        const newStreak = prevStreak + 1;
        localStorage.setItem("streak", newStreak.toString()); // Guardar la nueva racha
        setPixelSizeIndex(5); // Reiniciar el tamaño de píxel
        return newStreak;
      });
    } else {
      setMessage("Oops! Try again.");
      setLives((prevLives) => prevLives - 1); // Restar una vida

      // Aumentar el tamaño de píxel hasta el valor más pequeño
      setPixelSizeIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex < PIXEL_SIZE.length ? nextIndex : prevIndex; // No permitir que el índice supere el tamaño de la lista
      });

      // Si no hay vidas restantes, mostrar el mensaje de Game Over
      if (lives <= 1) {
        setGameOver(true);
        setMessage(`Game Over! The character is ${character.name}.`);
        setStreak(0); // Reiniciar la racha
        localStorage.removeItem("streak"); // Eliminar la racha del localStorage
        
      }
    }
  };

  // Función para reiniciar el juego
  const handleRestartGame = () => {
    setLives(LIVES); // Restablecer vidas
    setMessage(""); // Limpiar el mensaje
    setUserGuess(""); // Limpiar el input
    setGameOver(false); // Volver a habilitar el juego
    setPixelSizeIndex(0); // Resetear el tamaño de píxel
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Guess the character</h1>
        <p className="text-lg text-center text-gray-600 mb-6">Who is the character in the image?</p>
        <div className="w-full ">
          <PixelatedImage imageUrl={character.image ?? ""} pixelSize={PIXEL_SIZE[pixelSizeIndex]} />
        </div>
      
        <input
          type="text"
          value={userGuess}
          onChange={handleInputChange}
          className="border border-gray-300 rounded p-3 mt-4 w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter character name"
          disabled={gameOver} // Deshabilitar el input si el juego ha terminado
          required
        />
        
        <button
          onClick={handleCheckClick}
          className="mt-4 p-3 w-full bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          disabled={gameOver} // Deshabilitar el botón si el juego ha terminado
        >
          Check
        </button>

        {/* Mostrar mensaje de resultado y cuántas vidas quedan */}
        <div className="mt-4 text-center">
          {message && <p className="text-lg font-semibold text-gray-800">{message}</p>}
          {!gameOver && <p className="mt-2 text-lg text-gray-700">Lives: <span className="font-bold text-red-500">{lives}</span></p>}
          <p className="mt-2 text-lg text-gray-700">Streak: <span className="font-bold text-red-500">{streak}</span></p>
        </div>

        {gameOver && (
          <button
            onClick={handleRestartGame}
            className="mt-6 p-3 bg-green-500 text-white w-full rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            Restart Game
          </button>
        )}
      </div>
    </div>
  );
}
