import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-300 text-gray-700 py-6 w-full">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-2xl font-bold">Rick and Morty App</h2>
                    <p>&copy; 2025 Rick and Morty App. All rights reserved.</p>
                </div>
                <div className="flex space-x-4">
                    <span>By: Pablo Alvaro, Elena Diaz and Alejandro Navarro</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;