import { configureStore } from "@reduxjs/toolkit";
import { homeReducer } from "./slices/home-slice";
import { playerReducer } from "./slices/player-slice";

export const store = configureStore({
  reducer: {
    homePage: homeReducer,
    videoPlayer: playerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
