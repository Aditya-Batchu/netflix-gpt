import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";
import { NETFLIX_BACKGROUND } from "../utils/constants";

const GptSearch = () => {
  return (
    <>
      <div className="fixed -z-10">
        <img className="h-screen object-center w-screen " src={NETFLIX_BACKGROUND} alt="background" />
      </div>
      <div className="">
        <GptSearchBar />
        <GptMovieSuggestions /> 
      </div>
    </>
  );
};

export default GptSearch;
