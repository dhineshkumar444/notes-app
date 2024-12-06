import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNote, updateNote } from '../../store/notesSlice';
import { v4 as uuidv4 } from 'uuid';

const NoteFormModal = ({ currentNote, closeModal }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setText(currentNote.text);
    } else {
      setTitle('');
      setText('');
    }
  }, [currentNote]);

  const users = JSON.parse(localStorage.getItem('users')) || [];
    
  // Find the user with `IsLoggedIn` set to true
  const loggedInUser = users.find((user) => user.loggedIn === true);


  const handleSave = () => {
   

    if (!loggedInUser) {
      alert('No user is logged in!');
      return;
    }

    if (!title.trim() || !text.trim()) {
      alert('Title and text cannot be empty.');
      return;
    }

    const note = {
      id: currentNote ? currentNote.id : uuidv4(),
      title,
      text,
      updatedAt: new Date().toLocaleString(),
    };

    if (currentNote) {
      dispatch(updateNote({ userId: loggedInUser.id, note }));
    } else {
      dispatch(addNote({ userId: loggedInUser.id, note }));
    }

    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#f4f1de] rounded-md w-96 relative">
        {/* Close Button */}
        <div className='flex justify-between items-center p-1 px-4 rounded-t-md  mb-4 border-2 border-b-black bg-[#f2d1b5]'>
          <h2 className="text-md font-bold">
            {currentNote ? 'Edit Note' : 'Add Note'}
          </h2>
          <button
            onClick={closeModal}
            className="text-center font-bold text-red-600 text-4xl hover:text-gray-900"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Title Input */}
        <div className='px-6 pb-6'>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />

          {/* Text Area */}
          <textarea
            placeholder="Write your note here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="4"
          ></textarea>

          {/* Action Buttons */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              className="bg-[#22c55e] text-white px-6 py-1 rounded-md mr-2"
            >
              {currentNote ? 'Update' : 'Add'}
            </button>
            <button
              onClick={closeModal}
              className="bg-[#ef4444] text-white px-4 py-1 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteFormModal;
