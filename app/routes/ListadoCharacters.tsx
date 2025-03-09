import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import CharacterCard from "~/components/allCharacters/CardCharacter";
import type { Character } from "~/interfaces/character";

export default function CharacterList() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Filtros
  const [filter, setFilter] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null); // Nuevo estado para el estado de vida
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);

  // Opciones de filtros
  const [statusOptions, setStatusOptions] = useState<string[]>([]); // Opciones de estado de vida
  const [genders, setGenders] = useState<string[]>([]);
  const [species, setSpecies] = useState<string[]>([]);

  // Obtener los valores únicos de status, gender y species
  useEffect(() => {
    const fetchAllCharacters = async () => {
      try {
        let allCharacters: Character[] = [];
        let nextPage = "https://rickandmortyapi.com/api/character";

        // Recorrer todas las páginas
        while (nextPage) {
          const response = await fetch(nextPage);
          if (!response.ok) {
            throw new Error("Failed to fetch characters");
          }
          const data = await response.json();
          allCharacters = [...allCharacters, ...data.results]; // Acumular personajes
          nextPage = data.info.next; // Actualizar la URL de la siguiente página
        }

        // Extraer valores únicos
        const uniqueStatus = Array.from(
          new Set(allCharacters.map((character) => character.status))
        ) as string[];

        const uniqueGenders = Array.from(
          new Set(allCharacters.map((character) => character.gender))
        ) as string[];

        const uniqueSpecies = Array.from(
          new Set(allCharacters.map((character) => character.species))
        ) as string[];

        // Actualizar estados
        setStatusOptions(uniqueStatus);
        setGenders(uniqueGenders);
        setSpecies(uniqueSpecies);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchAllCharacters();
  }, []);

  // Obtener los personajes
  const fetchCharacters = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `https://rickandmortyapi.com/api/character?page=${page}`;
      if (filter) url += `&name=${encodeURIComponent(filter)}`;
      if (selectedStatus) url += `&status=${encodeURIComponent(selectedStatus)}`;
      if (selectedGender) url += `&gender=${encodeURIComponent(selectedGender)}`;
      if (selectedSpecies) url += `&species=${encodeURIComponent(selectedSpecies)}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch characters");
      }

      const data = await response.json();
      setCharacters(data.results);
      setTotalPages(data.info.pages);
    } catch (error) {
      setError("No characters found with the selected filters.");
      setCharacters([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  // Solo se ejecuta al cambiar la página o los filtros específicos
  useEffect(() => {
    fetchCharacters();
  }, [page, selectedStatus, selectedGender, selectedSpecies]);

  // Resetear la página al cambiar los filtros
  useEffect(() => {
    setPage(1);
  }, [selectedStatus, selectedGender, selectedSpecies]);

  const handleSearch = () => {
    setPage(1);
    fetchCharacters();
  };

  const clearFilters = () => {
    setFilter("");
    setSelectedStatus(null);
    setSelectedGender(null);
    setSelectedSpecies(null);
    setPage(1);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-10 px-6">
      {/* Filtro de búsqueda */}
      <div className="mb-8 flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-grow w-full sm:w-auto">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search characters..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kiwi-green focus:border-transparent transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-kiwi-green text-white rounded-lg hover:bg-kiwi-green-dark transition-all flex items-center gap-2 cursor-pointer"
          >
            <FaSearch />
            <span>Search</span>
          </button>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Filtros específicos */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status:
          </label>
          <select
            id="status"
            value={selectedStatus || ""}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kiwi-green focus:border-transparent transition-all"
          >
            <option value="">All Statuses</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
            Gender:
          </label>
          <select
            id="gender"
            value={selectedGender || ""}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kiwi-green focus:border-transparent transition-all"
          >
            <option value="">All Genders</option>
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="species" className="block text-sm font-medium text-gray-700 mb-1">
            Species:
          </label>
          <select
            id="species"
            value={selectedSpecies || ""}
            onChange={(e) => setSelectedSpecies(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-kiwi-green focus:border-transparent transition-all"
          >
            <option value="">All Species</option>
            {species.map((species) => (
              <option key={species} value={species}>
                {species}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de personajes */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center">
            <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-kiwi-green rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="col-span-full text-center py-10 text-gray-600">
            <p className="text-2xl font-semibold">Not Found</p>
            <p className="text-lg">No characters match the selected filters.</p>
          </div>
        ) : (
          characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))
        )}
      </div>

      {/* Paginación */}
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