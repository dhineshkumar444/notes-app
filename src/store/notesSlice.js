import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [], // Local state notes, will be loaded dynamically based on the logged-in user
  },
  reducers: {
    loadNotes: (state) => {
      // Load the logged-in user based on the isLoggedIn flag
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const currentUser = users.find(user => user.isLoggedIn === true);

      if (currentUser) {
        state.notes = currentUser.notes || []; // Set notes from the logged-in user
      } else {
        state.notes = []; // Default to an empty array if no logged-in user
      }
    },
    addNote: (state, action) => {
      // Load users from localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const currentUser = users.find(user => user.loggedIn === true);
   
      if (currentUser) {
      
        // Add the new note to the current logged-in user's notes array
        currentUser.notes.push(action.payload);
       
        // Persist the updated current user to localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
        // Update the users list in localStorage
        const userIndex = users.findIndex((user) => user.email === currentUser.email);
       
        if (userIndex !== -1) {
          users[userIndex] = currentUser;
          localStorage.setItem('users', JSON.stringify(users));
        }
    
        // Update the Redux state with the new note
        state.notes.push(action.payload);
      }
    },
    updateNote: (state, action) => {
      // Update a note for the logged-in user
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const currentUser = users.find(user => user.loggedIn === true);

      if (currentUser) {
        const noteIndex = currentUser.notes.findIndex((note) => note.id === action.payload.id);
        if (noteIndex !== -1) {
          currentUser.notes[noteIndex] = action.payload;
          localStorage.setItem('currentUser', JSON.stringify(currentUser)); // Persist currentUser to localStorage

          // Update the users list in localStorage
          const userIndex = users.findIndex((user) => user.email === currentUser.email);
          if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem('users', JSON.stringify(users));
          }

          // Update the Redux state
          state.notes[noteIndex] = action.payload;
        }
      }
    },
    deleteNote: (state, action) => {
      // Delete a note for the logged-in user
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const currentUser = users.find(user => user.loggedIn === true);
    

      if (currentUser) {
        currentUser.notes = currentUser.notes.filter((n) => n.note.id !== action.payload);
      
        localStorage.setItem('currentUser', JSON.stringify(currentUser)); // Persist currentUser to localStorage

        // Update the users list in localStorage
        const userIndex = users.findIndex((user) => user.email === currentUser.email);
        if (userIndex !== -1) {
          users[userIndex] = currentUser;
          localStorage.setItem('users', JSON.stringify(users));
        }

        // Update the Redux state
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      }
    },
  },
});

export const { loadNotes, addNote, updateNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
