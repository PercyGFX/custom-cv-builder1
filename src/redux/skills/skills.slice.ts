import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  skills: [
    "Javascript",
    "PHP",
    "JAVA",
    ".NET",
    "MYSQL",
    "Javascript",
    "MongoDB",
    "NestJS"
  ],
};

const skillsSlice = createSlice({
  name: "skillsSlice",
  initialState,
  reducers: {
    updateSkills(state, action) {
      state.skills = action.payload;
    },

    skillsReset: (state) => {
      state.skills = initialState.skills;
    },
  },
});

// Export the actions
export const { updateSkills, skillsReset } = skillsSlice.actions;

// Export the reducer
export const skillsReducer = skillsSlice.reducer;
