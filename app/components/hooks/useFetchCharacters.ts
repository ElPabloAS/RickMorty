import { useState, useEffect } from "react";

export function useFetchCharacters(searchTerm: string) {
  const [characterOptions, setCharacterOptions] = useState([]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setCharacterOptions([]);
      return;
    }

    const fetchCharacters = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`);
        const data = await response.json();
        if (data.results) {
          setCharacterOptions(
            data.results.map((character: any) => ({
              label: character.name,
              value: character.name,
            }))
          );
        } else {
          setCharacterOptions([]);
        }
      } catch (error) {
        console.error("Error fetching characters:", error);
        setCharacterOptions([]);
      }
    };

    const debounceTimer = setTimeout(fetchCharacters, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  return characterOptions;
}
