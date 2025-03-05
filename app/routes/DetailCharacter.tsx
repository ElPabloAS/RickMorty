import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Character } from "~/interfaces/character";
import CharacterDetail from "~/components/CardDetailCharacter";

export default function CharacterDetailPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCharacter();
  }, [id]);

  const fetchCharacter = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      if (!response.ok) throw new Error("Failed to fetch character");

      const data = await response.json();
      setCharacter(data);
    } catch (err) {
      setError("An error occurred while fetching the character. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading character...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!character) return null;

  return <CharacterDetail character={character} />;
}
