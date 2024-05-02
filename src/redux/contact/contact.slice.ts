import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contact: {
    address: "213/B, Darmapaala Rd, Colombo.",
    phone: "9477500660",
    email: "isurangabtk@gmail.com",
    website: "www.percygfx.com",
  },
};

const contactSlice = createSlice({
  name: "contactSlice",
  initialState,
  reducers: {
    updateContact(state, action) {
      state.contact = action.payload;
    },

    contactReset: (state) => {
      state.contact = initialState.contact;
    },
  },
});

// Export the actions
export const { updateContact, contactReset } = contactSlice.actions;

// Export the reducer
export const contactReducer = contactSlice.reducer;
