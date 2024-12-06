import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteNote } from '../../store/notesSlice';
import NoteFormModal from './NoteFormModal';
import NoteItem from './NoteItem';
import Home from '../home/Home';

const NotesList = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const [currentNote, setCurrentNote] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Use useEffect to get current user from localStorage when the component mounts
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
    setCurrentUser(loggedInUser);
  }, []);

  // If no currentUser is found, prompt to login or sign up
  if (currentUser == null) {
    return (
      <div className="px-4 py-4 flex justify-center items-center min-h-[85vh] bg-[#f4f1de] text-2xl font-bold">
        <p>
          Please{' '}
          <Link to="/login" className="text-red-600 hover:underline">
            login
          </Link>{' '}
          or{' '}
          <Link to="/signup" className="text-red-600 hover:underline">
            sign up
          </Link>{' '}
          to view your notes.
        </p>
      </div>
    );
  }

  // Find the logged-in user based on the currentUser in localStorage
  
  const loggedInUserDetails = users.find((user) => user.loggedIn == true);

  const handleEdit = (note) => {
    setCurrentNote(note);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteNote(id));
  };

  return (
    <div className='bg-[#f4f1de]'>
      <div className="px-4 pb-4 w-full lg:w-[80%] min-h-[85vh] mx-auto max-md-text-center">
        <Home />
        <div className='w-full max-md:text-center'>
        <button
          onClick={() => {
            setCurrentNote(null); // Prepare for new note
            setShowModal(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4  "
        >
          Add Note
        </button>
        </div>
       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
  {/* Check if notes are available, if not show the "Add notes" message */}
  {loggedInUserDetails && loggedInUserDetails.notes.length === 0 ? (
    <div className="col-span-full text-center text-xl font-semibold text-green-600 p-5">
      <p>No notes available. Please add a note.</p>
    </div>
  ) : (
    // If notes exist, render them
    loggedInUserDetails && loggedInUserDetails.notes.map((note) => (
      <NoteItem
        key={note.note.id}
        note={note.note}
        setCurrentNote={handleEdit}
        deleteNote={handleDelete}
      />
    ))
  )}
</div>

        {showModal && (
          <NoteFormModal
            currentNote={currentNote}
            closeModal={() => setShowModal(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default NotesList;
