import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="bg-black">
      <div className="mt-0 md:-mt-20 pl-4 md:pl-12 relative z-10">
        <MovieList title={"Now Playing"} movies={movies.NowPlayingMovies} />
        <MovieList title={"Popular"} movies={movies.popularMovies} />
        {/* <MovieList title={"Now Playing"} movies={movies.addNowPlayingMovies} />
        <MovieList title={"Now Playing"} movies={movies.popularMovies} /> */}
      </div>
    </div>
  );
};

export default SecondaryContainer;
