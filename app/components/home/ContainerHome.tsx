import CardHome from "./CardHome";
import SectionCardHome from "./SectionCardHome";

function ContainerHome() {
    return (
        <div>
            <div className="text-center mt-10 mb-10 bg-white">
            <h1 className="text-6xl font-extrabold  text-black">
            Rick and Morty<br/>
            <span className="block text-6xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-yellow-400">Multiverse</span>
        </h1>
        <p className="text-2xl text-gray-400 mt-5">Explore infinite dimensions, meet bizarre characters and discover the secrets of the universe!</p>
            </div>
    
       <SectionCardHome/>
      
     
    </div>
    );
}
export default ContainerHome;
