import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-gradient-to-r from-green-500 to-yellow-400 text-white p-6">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold">Rick and Morty App</h1>
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link to="/" className="hover:text-gray-400 text-lg">Home</Link>
                        </li>
                        <li>
                            <Link to="/characters" className="hover:text-gray-400 text-lg">Characters</Link>
                        </li>
                        <li>
                            <Link to="/guessCharacter" className="hover:text-gray-400 text-lg">GuessCharacter</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;