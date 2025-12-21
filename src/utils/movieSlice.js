import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name:"movies",
  initialState:{
    NowPlayingMovies :null,
    movieTrailer:null,
    popularMovies:null,
  },
  reducers:{
    addNowPlayingMovies:(state,action)=>{
      state.NowPlayingMovies =  action.payload;
    },
    removeMovies:(state,action)=>{
      state.NowPlayingMovies =  null;
    },
    addMovieTrailer:(state,action)=>{
      state.movieTrailer = action.payload;
    },
    addPopularMovies:(state, action)=>{
      state.popularMovies = action.payload;
    }
  }
})

export const {addNowPlayingMovies, removeMovies, addMovieTrailer, addPopularMovies} = movieSlice.actions;

export default movieSlice.reducer;
