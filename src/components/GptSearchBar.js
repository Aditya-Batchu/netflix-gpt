import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import { geminiModel } from "../utils/gemini";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const language = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      'https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1',
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };
  const handleGptSearchClick = async () => {
    const query = searchText.current.value;

    const prompt = `
      Act as a Movie Recommendation System.
      Suggest exactly 5 movies for the query: ${query}.
      Only return movie names, comma separated.
      Example: Sholay, Don, War 2, Srimanthudu, Golmaal
    `;

    try {
      const result = await geminiModel.generateContent(prompt);

      // FIXED: Added await and () because text() is an async function
      const responseText = await result.response.text();

      // Convert "Movie 1, Movie 2" -> ["Movie 1", "Movie 2"]
      const movieArray = responseText.split(",").map((m) => m.trim());

      // console.log("Gemini Movie Array:", movieArray);

      // Next Step: dispatch(addGptMovieResult({movieNames: movieArray}));

      const promiseArray = movieArray.map((movie)=> searchMovieTMDB(movie));

      const tmdbResults = await Promise.all(promiseArray);

      console.log(tmdbResults);

      dispatch(addGptMovieResult({movieNames:movieArray,tmdbResults:tmdbResults}));


    } catch (err) {
      console.error("Gemini Error:", err);
    }

  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="bg-black w-1/2 grid grid-cols-12 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="p-4 m-4 col-span-9 rounded-md"
          type="text"
          placeholder={lang[language].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-all"
          onClick={handleGptSearchClick}
        >
          {lang[language].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
