import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workExperience: [
    {
      position: "Software Enginner",
      company: "Company Name",
      time: "2013-2016",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices mi tempus imperdiet nulla malesuada. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Et tortor consequat id porta nibh venenatis cras sed felis.",
    },

    {
      position: "Graphic Designer",
      company: "Company Name",
      time: "2013-2016",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices mi tempus imperdiet nulla malesuada. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Et tortor consequat id porta nibh venenatis cras sed felis.",
    },
  ],
};

const workExperienceSlice = createSlice({
  name: "workExperienceSlice",
  initialState,
  reducers: {
    updateWorkExperience(state, action) {
      state.workExperience = action.payload;
    },

    workExperienceReset: (state) => {
      state.workExperience = initialState.workExperience;
    },
  },
});

// Export the actions
export const { updateWorkExperience, workExperienceReset } =
  workExperienceSlice.actions;

// Export the reducer
export const workExperienceReducer = workExperienceSlice.reducer;
