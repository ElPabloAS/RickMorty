
import { Link } from "react-router-dom"; 
import type { Character } from "~/interfaces/character";

interface Props {
  character: Character;
}
export default function CharacterDetail({ character }: Props) {


  return (
   <div className="container mx-auto px-4 py-8 flex justify-center">
    {character && (
      <div className="bg-green1/30 hover:shadow-xl transition-all duration-300 hover:bg-green1/40 backdrop-blur-lg rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center space-y-6 md:space-x-6 md:space-y-0 border border-white/40 border-opacity-30 max-w-3xl w-full">
        <img
          src={character.image ?? "/placeholder.svg"}
          alt={character.name}
          className="w-60 h-60 shadow-lg mx-auto md:mx-0"
        />
  
        <div className="text-left md:ml-10">
          <h2 className="text-2xl font-bold text-tardis-blue hover:text-teal-700">{character.name}</h2>
          <p className="text-endo">{character.species} - {character.status}</p>
          <p className="text-gray-700 pt-2">Origin: </p>
          <p className="text-gray-500">- {character.origin?.name}</p>
          <p className="text-gray-700">Location: </p>
          <p className="text-gray-500">- {character.location?.name}</p>
  
          {character.type && (
            <>
              <p className="text-gray-700">Type: </p>
              <p className="text-gray-500">- {character.type}</p>
            </>
          )}
  
          <Link to="/characters" className="mt-4 inline-block text-endo hover:text-teal-700">
            Back to Characters
          </Link>
        </div>
      </div>
    )}
  </div>
  
  );
}
