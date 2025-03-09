import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          <Link to="/">Rick and Morty App</Link>
        </h1>
        <nav>
          <Link to="/home" className="mr-4 hover:underline">Home</Link>
          <Link to="/listado-characters" className="hover:underline">Characters</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
