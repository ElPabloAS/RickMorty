import { Link } from "react-router";


function ButtonExplore() {
  return (
    <Link to="/characters">
    <button className="px-6 py-3  text-lg font-semibold rounded-lg bg-gradient-to-r from-green-500 to-yellow-400 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
    Start Exploring
  </button>
  </Link>
  );
}
export default ButtonExplore;