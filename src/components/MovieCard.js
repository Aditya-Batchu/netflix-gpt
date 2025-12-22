import { IMG_CDN_URL } from "../utils/constants"

const MovieCard = (props) => {
  const {poster_path} = props;
  if(!poster_path) return null;
  return (
    <div className="w-48">
      <img
      className="w-48 pr-4"
      src={IMG_CDN_URL+ poster_path}
      alt="Movie Card"/>

    </div>
  )
}

export default MovieCard
