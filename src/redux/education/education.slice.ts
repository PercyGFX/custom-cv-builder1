import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  education: [
    {
      cource: "Communication & Multimedia Designs",
      institute: "Avans Breda",
      time: "2015 - 2016",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices mi tempus imperdiet nulla malesuada.",
    },

    {
      cource: "Beng (Hons) in Software Engineering",
      institute: "SLITT",
      time: "2017 - 2020",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices mi tempus imperdiet nulla malesuada.",
    },
  ],
};

const educationSlice = createSlice({
  name: "educationSlice",
  initialState,
  reducers: {
    updateEducation(state, action) {
      state.education = action.payload;
    },

    educationReset: (state) => {
      state.education = initialState.education;
    },
  },
});

// Export the actions
export const { updateEducation, educationReset } = educationSlice.actions;

// Export the reducer
export const educationReducer = educationSlice.reducer;
