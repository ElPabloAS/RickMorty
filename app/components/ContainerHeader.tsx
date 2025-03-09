import React from 'react';

function ContainerHeader() {
  return (
    <div className="text-center mt-10 mb-10">
      <h1 className="text-6xl font-extrabold text-black">
        Rick and Morty<br />
        <span className="block text-6xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-yellow-400">
          Characters
        </span>
      </h1>
      <p className="text-2xl text-gray-400 mt-5">
        Discover the amazing characters from the Rick and Morty universe!
      </p>
    </div>
  );
}

export default ContainerHeader;
