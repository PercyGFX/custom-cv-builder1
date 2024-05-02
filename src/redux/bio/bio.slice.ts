import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bio: {
    name: "John Doe",
    title: "Senior Software Engineer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices mi tempus imperdiet nulla malesuada. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper.",
    profileimg: "./profile.jpg",
  },
};

const bioSlice = createSlice({
  name: "bioSlice",
  initialState,
  reducers: {
    updateBio(state, action) {
      //console.log(action.payload);
      state.bio = action.payload;
    },

    bioReset: (state) => {
      state.bio = initialState.bio;
    },
  },
});

// Export the actions
export const { updateBio, bioReset } = bioSlice.actions;

// Export the reducer
export const bioReducer = bioSlice.reducer;
