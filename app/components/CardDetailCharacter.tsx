import { useState, useEffect } from "react";
import type { Character } from "~/interfaces/character"; 
import { Link } from "react-router";

export default function CharacterList() {
  const [characters, setCharacters] = useState<Character[]>([]); // Lista de personajes
  const [loading, setLoading] = useState(true); // Estado de carga
  const [id, setId] = useState(1);
  const [error, setError] = useState<string | null>(null); // Estado de error
 


 

  const fetchCharacters = async (pageNumber: number) => {
    setLoading(true); // Iniciar carga
    setError(null); // Limpiar error previo
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character?id=${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch characters");
      }

      
      const data = await response.json();

      setCharacters(data.results); // Asignamos los personajes a la lista
   
    } catch (err) {
      setError("An error occurred while fetching characters. Please try again later.");
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading characters...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-tardis-blue">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters.map((character) => (
            <Link key={character.id} to={`/character/${character.id}`}>
          <div key={character.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="card-image">
              <img src={character.image || "/placeholder.svg"} alt={character.name} />
            </div>
            <div className="card-content text-center  p-2">
              <h2 className="text-xl font-semibold mb-2 hover:text-kiwi-green">{character.name}</h2>
              <p className="pb-2">{character.species}</p>
             
            </div>
          </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
