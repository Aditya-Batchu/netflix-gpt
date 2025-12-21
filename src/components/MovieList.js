import MovieCard from "./MovieCard";

const MovieList = (props) => {
  const { title, movies } = props;
  console.log(movies);
  return (
    movies && (
      <div className="pt-6">
        <h1 className="text-3xl font-bold py-6 text-white">{title}</h1>
        <div className="flex overflow-x-scroll pt-6">
          <div className="flex">
            {movies?.map((movie) => (
              <MovieCard key={movie.id} poster_path={movie.poster_path} />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default MovieList;
