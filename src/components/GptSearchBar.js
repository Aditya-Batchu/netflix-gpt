import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef, useState } from "react";
import { geminiModel } from "../utils/gemini";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const language = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  // loading state: disables input/button and shows spinner until request completes
  const [loading, setLoading] = useState(false);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };
  const handleGptSearchClick = async () => {
    const query = searchText.current.value;
    if (!query?.trim() || loading) return; // prevent empty or duplicate requests
    setLoading(true);

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

      console.log("Gemini Movie Array:", movieArray);

      // Next Step: dispatch(addGptMovieResult({movieNames: movieArray}));

      const promiseArray = movieArray.map((movie) => searchMovieTMDB(movie));

      const tmdbResults = await Promise.all(promiseArray);

      console.log(tmdbResults);

      dispatch(
        addGptMovieResult({ movieNames: movieArray, tmdbResults: tmdbResults })
      );
    } catch (err) {
      console.error("Gemini Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[30%] md:pt-[10%] flex justify-center">
      <form
        className="w-full bg-black md:w-1/2 grid grid-cols-12 rounded-lg"
        onSubmit={(e) => {
          e.preventDefault();
          handleGptSearchClick();
        }}
      >
        <input
          ref={searchText}
          disabled={loading}
          className="p-4 m-4 col-span-9 rounded-md"
          type="text"
          placeholder={lang[language].gptSearchPlaceholder}
        />
        <button
          type="button"
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleGptSearchClick}
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            lang[language].search
          )}
        </button>
        {/* Loading status */}
        {loading && (
          <div className="col-span-12 m-4 text-white">Loading results...</div>
        )}
      </form>
    </div>
  );
};

export default GptSearchBar;
