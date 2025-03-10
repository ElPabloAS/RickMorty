import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faBars);

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <header className="bg-gradient-to-r from-green-500 to-yellow-400 text-white p-6">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-3xl font-bold">Rick and Morty App</h1>
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <FontAwesomeIcon icon="bars" />
                </button>
                <nav className={`md:flex md:items-center ${isOpen ? 'block' : 'hidden'}`}>
                    <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mt-4 md:mt-0">
                        <li>
                            <Link to="/" className="hover:text-gray-400 text-lg">Home</Link>
                        </li>
                        <li>
                            <Link to="/characters" className="hover:text-gray-400 text-lg">Characters</Link>
                        </li>
                        <li className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="hover:text-gray-400 text-lg focus:outline-none"
                            >
                                More
                            </button>
                            {isDropdownOpen && (
                                <ul className="absolute bg-white text-black mt-2 py-2 w-48 rounded shadow-lg left-0 top-full">
                                    <li>
                                        <Link to="/guessCharacter" className="block px-4 py-2 hover:bg-gray-200">Guess Character</Link>
                                    </li>
                                    <li>
                                        <Link to="/about" className="block px-4 py-2 hover:bg-gray-200">About</Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
