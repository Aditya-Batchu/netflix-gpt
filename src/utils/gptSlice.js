import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieNames:null,
    tmdbResults:null,

  },
  reducers: {
    toggleGptSearchView: (state, action) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult:(state,action)=>{
      const {movieNames, tmdbResults} = action.payload;
      state.movieNames = movieNames;
      state.tmdbResults = tmdbResults;
    },

  },
});

export const { toggleGptSearchView, addGptMovieResult } = gptSlice.actions;

export default gptSlice.reducer;
