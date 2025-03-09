import { useState, useEffect } from "react";
import GuessCharacter from "../components/GuessCharacter";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import type { Character } from "../interfaces/character";

export default function GameCharacter() {
  const [randomCharacter, setRandomCharacter] = useState<Character | null>(null);

  // Función para obtener un personaje aleatorio
  const fetchRandomCharacter = async () => {
    try {
      // Paso 1: Obtener el número total de personajes
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const data = await response.json();
      const totalCharacters = data.info.count;

      // Paso 2: Generar un ID aleatorio
      const randomId = Math.floor(Math.random() * totalCharacters) + 1;

      // Paso 3: Obtener el personaje con el ID aleatorio
      const characterResponse = await fetch(
        `https://rickandmortyapi.com/api/character/${randomId}`
      );
      const characterData = await characterResponse.json();

      // Paso 4: Mapear los datos del personaje a la interfaz Character
      const character: Character = {
        id: characterData.id,
        name: characterData.name,
        image: characterData.image,
        status: characterData.status,
        species: characterData.species,
        type: characterData.type,
        gender: characterData.gender,
        origin: characterData.origin,
        location: characterData.location,
        episode: characterData.episode,
        url: characterData.url,
        created: characterData.created,
      };

      // Paso 5: Actualizar el estado con el personaje aleatorio
      setRandomCharacter(character);
    } catch (error) {
      console.error("Error fetching random character:", error);
    }
  };

  // Obtener un personaje aleatorio cuando el componente se monta
  useEffect(() => {
    fetchRandomCharacter();
  }, []);

  // Si aún no se ha cargado el personaje, mostrar un spinner de carga
  if (!randomCharacter) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        <p className="mt-4 text-lg text-white font-semibold">Loading character...</p>
      </div>
    );
  }

  // Pasar el personaje aleatorio y la función de reinicio al componente GuessCharacter
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <GuessCharacter
        character={randomCharacter}
        onRestart={fetchRandomCharacter} // Pasamos la función de reinicio
      />
      <Footer />
    </div>
  );
}