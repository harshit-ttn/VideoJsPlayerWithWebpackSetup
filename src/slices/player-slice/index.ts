import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState: any = {};

export const clearState = createAction("clear-state");

export const playBackUrl = createAction(
  "playback-url",
  function videoUrl(url: any) {
    return {
      payload: { data: url },
    };
  }
);

export const playBackFormat = createAction(
  "playback-format",
  function format(value: any) {
    return {
      payload: { data: value },
    };
  }
);

export const contentName = createAction(
  "content-name",
  function content(value: any) {
    return {
      payload: { data: value },
    };
  }
);

export const drmValues = createAction(
  "drm-values",
  function drmProtection(value: any) {
    return {
      payload: { data: value },
    };
  }
);

const playerSlice = createSlice({
  name: "videoPlayer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(playBackUrl, (state = { playBackUrl }, action) => {
      state.playBackUrlData = action.payload.data;
    });

    builder.addCase(playBackFormat, (state = { playBackFormat }, action) => {
      state.playBackFormatData = action.payload.data;
    });

    builder.addCase(contentName, (state = { contentName }, action) => {
      state.contentNameData = action.payload.data;
    });

    builder.addCase(drmValues, (state = { drmValues }, action) => {
      state.drmData = action.payload.data;
    });
  },
});

export const playerReducer = playerSlice.reducer;
