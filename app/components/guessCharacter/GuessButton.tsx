interface GuessButtonProps {
    onClick: () => void;
    disabled: boolean;
  }
  
  export default function GuessButton({ onClick, disabled }: GuessButtonProps) {
    return (
      <button
        onClick={onClick}
        className="mt-4 p-3 w-full bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        disabled={disabled}
      >
        Check
      </button>
    );
  }
  