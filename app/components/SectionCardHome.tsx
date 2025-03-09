import ButtonExplore from "./ButtonExplore";
import CardHome from "./CardHome";

function SectionCardHome() {
  return (<>

    <div className="flex justify-center  p-5">
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6 justify-center">
        <CardHome 
          href="/characters" 
          icon="../rick_and_morty.gif" 
          title="Characters" 
          description="Meet the most intriguing beings in the multiverse" 
        />
        <CardHome 
          href="/characters" 
          icon="../lawyermorty.gif" 
          title="Guess" 
          description="Test your knowledge of the series" 
        />
      </div>
      
     
     
    </div>
     <div className="flex justify-center m-10">
     <ButtonExplore />
   </div>
   </>
  );
}

export default SectionCardHome;