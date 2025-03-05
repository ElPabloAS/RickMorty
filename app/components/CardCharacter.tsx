import { Link } from "react-router-dom";
import type { Character } from "~/interfaces/character";

interface Props {
  character: Character;
}

export default function CharacterCard({ character }: Props) {
  return (
    <Link to={`/characters/${character.id}`}>
   
   <div className="relative bg-green1/30 backdrop-blur-xl rounded-lg hover:bg-green1/40 hover:backdrop-blur-2xl hover:shadow-xl  transition-all duration-300 p-4 border border-white/40 border-opacity-30 shadow-inner">

  <div className="absolute inset-0 bg-white/10 rounded-lg opacity-30 blur-lg pointer-events-none transition-opacity duration-300 hover:opacity-40"></div>


  <div className="flex justify-center">
    <img
      src={character.image || "/placeholder.svg"}
      alt={character.name}
      className="w-48 h-48 rounded-lg shadow-lg"
    />
  </div>


  <div className="text-center mt-4 relative">
    <h2 className="text-xl font-semibold mb-2 text-tardis-blue hover:text-endo">
      {character.name}
    </h2>
    <p className="pb-2">{character.species}</p>
  </div>
</div>


    
    </Link>
  );
}
