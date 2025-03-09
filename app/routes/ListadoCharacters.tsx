import { useState, useEffect } from "react";
import CharacterCard from "~/components/CardCharacter"; 
import type { Character } from "~/interfaces/character";

export default function CharacterList() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
        if (!response.ok) throw new Error("Failed to fetch characters");

        const data = await response.json();
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch {
        setError("An error occurred while fetching characters.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  if (loading) return <div className="text-center py-10">Loading characters...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-10 px-6">

  <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {characters.map((character) => (
      <CharacterCard key={character.id} character={character} />
    ))}
  </div>


  <div className="flex justify-center items-center space-x-4 mt-10">
    <button
      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
      disabled={page === 1}
      className="px-5 py-2 bg-kiwi-green text-tardis-blue font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-endo transition-all"
    >
      {"<"}
    </button>

    <span className="text-tardis-blue font-bold text-lg">
      Page {page} of {totalPages}
    </span>

    <button
      onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={page === totalPages}
      className="px-5 py-2 bg-kiwi-green text-tardis-blue font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-endo transition-all"
    >
      {">"}
    </button>
  </div>
</div>

  );
}
