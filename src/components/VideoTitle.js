const VideoTitle = (props) => {
  const { title, overview, maxLength = 150 } = props;

  const truncateOverview = (text, len) => {
    if (!text) return "";
    if (text.length <= len) return text;
    const sub = text.slice(0, len);
    const lastSpace = sub.lastIndexOf(" ");
    const trimmed = lastSpace > 0 ? sub.slice(0, lastSpace) : sub;
    return trimmed.trim() + "...";
  };

  const shortOverview = truncateOverview(overview, maxLength);

  return (
    <div className="w-screen aspect-video pt-[15%] px-6 md:px-16 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-3 xl md:text-6xl font-bold w-1/2 mt-20 mb-5">{title}</h1>
      <p className="py-6 text-lg w-1/4 hidden md:inline-block">{shortOverview}</p>

      <div className="">
        <button className="bg-white text-black py-2 md:py-4 px-6 md:px-10 text-lg rounded-lg hover:bg-opacity-80">
          {" "}
          🎥 Play
        </button>
        <button className="hidden md:inline-block bg-gray-500 text-white p-4 px-10 mx-2 text-lg bg-opacity-50 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
