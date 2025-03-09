interface RestartButtonProps {
    onClick: () => void;
  }
  
  export default function RestartButton({ onClick }: RestartButtonProps) {
    return (
      <button
        onClick={onClick}
        className="mt-6 p-3 bg-green-500 text-white w-full rounded-lg shadow-md hover:bg-green-600 transition duration-300"
      >
        Restart Game
      </button>
    );
  }
  