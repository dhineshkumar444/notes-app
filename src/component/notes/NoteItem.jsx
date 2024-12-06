
import React from 'react';

const NoteItem = ({ note, setCurrentNote, deleteNote }) => {

  return (
    <div className=" border border-gray-300 rounded-lg shadow-md mb-4 flex justify-between flex-col items-center bg-white hover:shadow-lg transition-shadow duration-300">
      <div className='w-full '>
      <div className='flex justify-between items-center px-3 py-1  mb-4 border-2 rounded-t-md border-b-black bg-[#f2d1b5]'>
        <h2 className="text-md font-bold">
          {note.title}
        </h2>
        <button
          onClick={() => deleteNote(note.id)}
          className=" text-center font-bold text-red-600 text-4xl hover:text-gray-900 "
          aria-label="Close"
        >
          &times;
        </button>

        {/* Modal Header */}
       
        </div>
        <div className='min-h-[150px] flex items-center justify-center px-5 py-2'>
        <p className="text-gray-700">{note.text}</p>
        </div>
      </div>
      <div className="flex justify-between items-center w-full px-5 py-2 max-md:flex-col max-md:gap-5">
        
        <button
          className="text-blue-500  hover:text-blue-700"
          onClick={() => setCurrentNote(note)}
        >
          Edit
        </button>
        <p className="text-sm text-gray-500 ">Updated at: {note.updatedAt}</p>
      </div>
    </div>
  );
};

export default NoteItem;
