import { configureStore } from "@reduxjs/toolkit";
import { createAction, createReducer } from "@reduxjs/toolkit";

export const addContact = createAction("contacts/addContact");
export const removeContact = createAction("contacts/deleteContact");

const contactsReducer = createReducer(
  JSON.parse(localStorage.getItem("contacts")) || [],
  {
    [addContact]: (state, action) => [...state, action.payload],
    [removeContact]: (state, action) =>
      state.filter((contact) => contact.id !== action.payload),
  }
);

export const setFilter = createAction("filter/setFilter");

const filterReducer = createReducer("", {
  [setFilter]: (state, action) => (state = action.payload),
});

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
});
