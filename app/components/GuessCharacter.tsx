
import PixelatedImage from './PixelatedImage';
import type { Character } from '../interfaces/character';


export default function GuessCharacter({ character }: { character: Character }) {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold text-center">Guess the character</h1>
            <p className="text-lg text-center">Who is the character in the image?</p>
            <PixelatedImage imageUrl={character.image ?? ''} pixelSize={10} />
          
        </div>
    );
}