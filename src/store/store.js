import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './notesSlice'; // Import your notesSlice reducer

const store = configureStore({
  reducer: {
    notes: notesReducer, // Add the notes reducer to the store
  },
});

export default store;
