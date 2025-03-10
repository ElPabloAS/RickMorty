import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-gradient-to-r from-green-500 to-yellow-400 text-white p-6">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold">Rick and Morty App</h1>
                
                {/* Botón del menú hamburguesa */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
                
                {/* Navegación */}
                <nav className={`absolute md:static top-16 left-0 w-full bg-green-500 md:bg-transparent md:flex ${isOpen ? 'block' : 'hidden'}`}>
                    <ul className="flex flex-col md:flex-row md:space-x-6 p-4 md:p-0 md:ml-auto">
                        <li>
                            <Link to="/" className="block px-4 py-2 md:px-0 md:py-0 hover:text-gray-400 text-lg">Home</Link>
                        </li>
                        <li>
                            <Link to="/characters" className="block px-4 py-2 md:px-0 md:py-0 hover:text-gray-400 text-lg">Characters</Link>
                        </li>
                        <li>
                            <Link to="/guessCharacter" className="block px-4 py-2 md:px-0 md:py-0 hover:text-gray-400 text-lg">GuessCharacter</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
