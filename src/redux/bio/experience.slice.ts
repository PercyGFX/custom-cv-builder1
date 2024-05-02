import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  experience: [
    "Lorem ipsum dolor sit amet",
    "consectetur adipiscing elit",
    "sed do eiusmod tempor incididunt",
    "vestibulum rhoncus est pellentesque",
  ],
};

const experienceSlice = createSlice({
  name: "experienceSlice",
  initialState,
  reducers: {
    updateExperience(state, action) {
      state.experience = action.payload;
    },

    experienceReset: (state) => {
      state.experience = initialState.experience;
    },
  },
});

// Export the actions
export const { updateExperience, experienceReset } = experienceSlice.actions;

// Export the reducer
export const experienceReducer = experienceSlice.reducer;
