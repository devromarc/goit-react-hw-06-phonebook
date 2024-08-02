import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialContact = {
  list: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: initialContact,
  reducers: {
    addContact: {
      reducer(state, action) {
        state.list = [...state.list, action.payload];
      },
      prepare({ name, number }) {
        return { payload: { id: nanoid(), name, number } };
      },
    },
    deleteContacts(state, action) {
      state.list = state.list.filter(contact => contact.id !== action.payload);
    },
  },
});

export const { deleteContacts, addContact } = contactSlice.actions;
export const contactsReducer = contactSlice.reducer;
