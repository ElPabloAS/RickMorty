import { useState, useEffect } from "react";
import PixelatedImage from "./PixelatedImage";
import CharacterSelect from "./CharacterSelect";
import GameStatus from "./GameStatus";
import GuessButton from "./GuessButton";
import RestartButton from "./RestartButton";
import { useFetchCharacters } from "../hooks/useFetchCharacters";
import type { Character } from "../../interfaces/character";

const PIXEL_SIZE = [20, 15, 10, 5, 1];
const LIVES = 5;

export default function GuessCharacter({ character, onRestart }: { character: Character; onRestart: () => void }) {
  const [userGuess, setUserGuess] = useState("");
  const [message, setMessage] = useState("");
  const [lives, setLives] = useState(LIVES);
  const [gameOver, setGameOver] = useState(false);
  const [pixelSizeIndex, setPixelSizeIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const characterOptions = useFetchCharacters(searchTerm);

  const [streak, setStreak] = useState(0);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedStreak = localStorage.getItem("streak");
      setStreak(savedStreak ? parseInt(savedStreak, 10) : 0);
      setIsClient(true);
    }
  }, []);

  const handleCheckClick = () => {
    if (userGuess.trim().toLowerCase() === character.name.toLowerCase()) {
      setMessage(`Correct! The character is ${character.name}.`);
      setGameOver(true);
      setStreak((prev) => {
        const newStreak = prev + 1;
        localStorage.setItem("streak", newStreak.toString());
        return newStreak;
      });
    } else {
      setMessage("Oops! Try again.");
      setLives((prev) => (prev - 1 <= 0 ? 0 : prev - 1));
      setPixelSizeIndex((prev) => (prev + 1 < PIXEL_SIZE.length ? prev + 1 : prev));
      if (lives - 1 <= 0) {
        setGameOver(true);
        setMessage(`Game Over! The character is ${character.name}.`);
        setStreak(0);
        localStorage.removeItem("streak");
      }
    }
  };

  const handleRestartGame = () => {
    setLives(LIVES);
    setMessage("");
    setUserGuess("");
    setGameOver(false);
    setPixelSizeIndex(0);
    setSearchTerm("");
    onRestart();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Guess the Character</h1>
        <p className="text-lg text-gray-600 mb-4">Who is the character in the image?</p>
  
        <div className="flex justify-center mb-4">
          <PixelatedImage imageUrl={character.image ?? ""} pixelSize={PIXEL_SIZE[pixelSizeIndex]} />
        </div>
  
        {isClient && (
          <CharacterSelect onSelect={setUserGuess} onSearch={setSearchTerm} options={characterOptions} disabled={gameOver} />
        )}
  
        <div className="mt-4">
          <GuessButton onClick={handleCheckClick} disabled={gameOver} />
        </div>
  
        <GameStatus message={message} lives={lives} streak={streak} gameOver={gameOver} />
  
        {gameOver && (
          <div className="mt-4">
            <RestartButton onClick={handleRestartGame} />
          </div>
        )}
      </div>
    </div>
  );
  
}
