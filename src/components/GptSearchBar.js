const GptSearchBar = () => {
  return (
    <div className="pt-[7%] flex justify-center">
      <form className="bg-black w-1/2 grid grid-cols-12">
        <input
          className="p-4 m-4 col-span-9"
          type="text"
          placeholder="What do you like to watch today?"
        ></input>
        <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg">
          Search
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
