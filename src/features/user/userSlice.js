import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    name: "",
    rating: "",
    bio: "",
    token: "",
    song: {
      title: "",
      artist: "",
      preview: "",
      cover: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.username;
      state.rating = action.payload.rating;
      state.bio = action.payload.bio;
      state.token = action.payload.token;

      state.song.title = action.payload.song.title;
      state.song.artist = action.payload.song.artist;
      state.song.cover = action.payload.song.cover;
      state.song.preview = action.payload.song.preview;
    },
    updateUserRating: (state, action) => {
      state.rating = action.payload;
    },
    unSetUser: (state) => {
      state.name = "";
      state.rating = "";
      state.bio = "";
      state.token = "";

      state.song.title = "";
      state.song.artist = "";
      state.song.cover = "";
      state.song.preview = "";
    },
  },
});

export const { setUser, unSetUser, updateUserRating } = user.actions;
export default user.reducer;
