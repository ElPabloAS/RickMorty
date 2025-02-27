import { useState, useEffect } from "react";
import Select from "react-select";
import PixelatedImage from "./PixelatedImage";
import type { Character } from "../interfaces/character";

const PIXEL_SIZE = [20, 15, 10, 5, 1]; // Tamaños de píxel disponibles
const LIVES = 5; // Vidas iniciales

export default function GuessCharacter({
  character,
  onRestart, // Recibimos la función de reinicio como prop
}: {
  character: Character;
  onRestart: () => void; // Tipo de la función de reinicio
}) {
  const [userGuess, setUserGuess] = useState("");
  const [message, setMessage] = useState("");
  const [lives, setLives] = useState(LIVES); // Vidas iniciales
  const [gameOver, setGameOver] = useState(false); // Para saber si el juego ha terminado
  const [pixelSizeIndex, setPixelSizeIndex] = useState(0); // Índice del tamaño de píxel
  const [isClient, setIsClient] = useState(false); // Para renderizar condicionalmente en el cliente
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda
  const [characterOptions, setCharacterOptions] = useState([]); // Opciones del Select

  // Cargar la racha de victorias desde el localStorage en el navegador
  const [streak, setStreak] = useState(0); // Estado inicial vacío o 0
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedStreak = localStorage.getItem("streak");
      setStreak(savedStreak ? parseInt(savedStreak, 10) : 0);
      setIsClient(true); // Indicar que estamos en el cliente
    }
  }, []);

  // Función para buscar personajes en la API
  const fetchCharacters = async (searchTerm: string) => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${searchTerm}`
      );
      const data = await response.json();
      if (data.results) {
        const characterNames = data.results.map((character: any) => ({
          label: character.name,
          value: character.name,
        }));
        setCharacterOptions(characterNames); // Actualizar las opciones del Select
      } else {
        setCharacterOptions([]); // Si no hay resultados, limpiar las opciones
      }
    } catch (error) {
      console.error("Error fetching characters:", error);
      setCharacterOptions([]); // Limpiar las opciones en caso de error
    }
  };

  // Debounce para evitar llamadas excesivas a la API
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setCharacterOptions([]); // Limpiar las opciones si no hay término de búsqueda
      return;
    }

    const debounceTimer = setTimeout(() => {
      fetchCharacters(searchTerm); // Llamar a la API después de un retraso
    }, 300); // 300ms de retraso

    return () => clearTimeout(debounceTimer); // Limpiar el timer si el término cambia
  }, [searchTerm]);

  // Función que maneja el cambio del input
  const handleInputChange = (selectedOption: any) => {
    setUserGuess(selectedOption?.value || ""); // Actualizar el valor cuando se selecciona una opción
  };

  // Función para manejar la búsqueda dinámica
  const handleSearchChange = (inputValue: string) => {
    setSearchTerm(inputValue); // Actualizar el término de búsqueda
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
      setLives((prevLives) => {
        const updatedLives = prevLives - 1; // Decrementar las vidas
        if (updatedLives <= 0) {
          setGameOver(true);
          setMessage(`Game Over! The character is ${character.name}.`);
          setStreak(0); // Reiniciar la racha
          localStorage.removeItem("streak"); // Eliminar la racha del localStorage
        }
        return updatedLives; // Retornar el valor actualizado de vidas
      });

      // Aumentar el tamaño de píxel hasta el valor más pequeño
      setPixelSizeIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex < PIXEL_SIZE.length ? nextIndex : prevIndex; // No permitir que el índice supere el tamaño de la lista
      });
    }
  };

  // Función para reiniciar el juego
  const handleRestartGame = () => {
    setLives(LIVES); // Restablecer vidas
    setMessage(""); // Limpiar el mensaje
    setUserGuess(""); // Limpiar el input
    setGameOver(false); // Volver a habilitar el juego
    setPixelSizeIndex(0); // Resetear el tamaño de píxel
    setSearchTerm(""); // Limpiar el término de búsqueda
    setCharacterOptions([]); // Limpiar las opciones del Select
    onRestart(); // Llamar a la función de reinicio para obtener un nuevo personaje
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          Guess the Character
        </h1>
        <p className="text-lg text-center text-gray-600 mb-6">
          Who is the character in the image?
        </p>
        <div className="w-full mb-3.5">
          <PixelatedImage
            imageUrl={character.image ?? ""}
            pixelSize={PIXEL_SIZE[pixelSizeIndex]}
          />
        </div>

        {/* Renderizar el Select solo en el cliente */}
        {isClient && (
          <Select
            options={characterOptions} // Opciones dinámicas
            onChange={handleInputChange} // Al cambiar, actualizamos el valor
            onInputChange={handleSearchChange} // Manejar la búsqueda dinámica
            className="text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search for the character's name"
            isDisabled={gameOver}
            instanceId="character-select" // ID estático para evitar desajustes
            noOptionsMessage={() => "No results found"} // Mensaje si no hay opciones
          />
        )}

        <button
          onClick={handleCheckClick}
          className="mt-4 p-3 w-full bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          disabled={gameOver} // Deshabilitar el botón si el juego ha terminado
        >
          Check
        </button>

        {/* Mostrar mensaje de resultado y cuántas vidas quedan */}
        <div className="mt-4 text-center">
          {message && (
            <p className="text-lg font-semibold text-gray-800">{message}</p>
          )}
          {!gameOver && (
            <p className="mt-2 text-lg text-gray-700">
              Lives: <span className="font-bold text-red-500">{lives}</span>
            </p>
          )}
          <p className="mt-2 text-lg text-gray-700">
            Streak: <span className="font-bold text-red-500">{streak}</span>
          </p>
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