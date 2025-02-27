import GuessCharacter from "../components/GuessCharacter";
import type { Character } from "../interfaces/character";

export default function GameCharacter() {
    const character: Character = {
        id: 1,
        name: "Rick",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        status: null,
        species: null,
        type: null,
        gender: null,
        origin: { name: "Earth", url: "https://rickandmortyapi.com/api/location/1" },
        location: { name: "Citadel of Ricks", url: "https://rickandmortyapi.com/api/location/3" },
        episode: [],
        url: null,
        created: null
    };

    return <GuessCharacter character={character} />;
}