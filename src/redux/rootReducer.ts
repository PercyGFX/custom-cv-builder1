import { combineReducers } from "@reduxjs/toolkit";
import { bioReducer } from "./bio/bio.slice";
import { experienceReducer } from "./bio/experience.slice";
import { skillsReducer } from "./skills/skills.slice";
import { contactReducer } from "./contact/contact.slice";
import { workExperienceReducer } from "./work-experience/work-experience.slice";
import { educationReducer } from "./education/education.slice";


const rootReducer = combineReducers({
  bioReducer: bioReducer,
  experienceReducer: experienceReducer,
  skillsReducer: skillsReducer,
  contactReducer: contactReducer,
  workExperienceReducer: workExperienceReducer,
  educationReducer: educationReducer,
});

export default rootReducer;
