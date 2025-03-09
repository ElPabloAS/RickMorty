interface GameStatusProps {
    message: string;
    lives: number;
    streak: number;
    gameOver: boolean;
  }
  
  export default function GameStatus({ message, lives, streak, gameOver }: GameStatusProps) {
    return (
      <div className="mt-4 text-center">
        {message && <p className="text-lg font-semibold text-gray-800">{message}</p>}
        {!gameOver && (
          <p className="mt-2 text-lg text-gray-700">
            Lives: <span className="font-bold text-red-500">{lives}</span>
          </p>
        )}
        <p className="mt-2 text-lg text-gray-700">
          Streak: <span className="font-bold text-red-500">{streak}</span>
        </p>
      </div>
    );
  }
  