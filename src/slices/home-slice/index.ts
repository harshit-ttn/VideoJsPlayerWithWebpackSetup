import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState: any = {};

export const contentList = createAction(
  "content-list",
  function listIndex(index: any) {
    return {
      payload: { data: index },
    };
  }
);

export const movieList = createAction(
  "movie-list",
  function movieIndex(index: any) {
    return {
      payload: { data: index },
    };
  }
);

const homeSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(contentList, (state = { contentList }, action) => {
      state.contentListIndex = action.payload.data;
    });

    builder.addCase(movieList, (state = { movieList }, action) => {
      state.movieListIndex = action.payload.data;
    });
  },
});

export const homeReducer = homeSlice.reducer;
