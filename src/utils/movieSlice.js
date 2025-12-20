import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name:"movies",
  initialState:{
    addNowPlayingMovies :null,
    movieTrailer:null
  },
  reducers:{
    addNowPlayingMovies:(state,action)=>{
      state.addNowPlayingMovies =  action.payload;
    },
    removeMovies:(state,action)=>{
      state.addNowPlayingMovies =  null;
    },
    addMovieTrailer:(state,action)=>{
      state.movieTrailer = action.payload;
    }
  }
})

export const {addNowPlayingMovies, removeMovies, addMovieTrailer} = movieSlice.actions;

export default movieSlice.reducer;
