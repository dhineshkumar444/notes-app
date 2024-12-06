
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the list of users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find the user with `IsLoggedIn` set to true
    const loggedInUser = users.find((user) => user.loggedIn === true);

    if (loggedInUser) {
      setUser(loggedInUser); // Set the logged-in user details
    }
  }, []);

  const handleLogout = () => {
    // Retrieve the list of users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Update the logged-in status of the current user
    const updatedUsers = users.map((u) =>
      u.email === user.email ? { ...u, loggedIn: false } : u
    );

    // Save the updated list of users to localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(null));


    // Clear user data from state and navigate to login
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="bg-[#f4f1de]">
      <div className="flex justify-between items-start w-full mx-auto pb-5 ">
        <div className="text-center w-full">
          {user ? (
            <div className="flex justify-between items-center max-md:flex-col">
              <h1 className="text-xl font-bold">Welcome, {user.username}!</h1>
              <button
                onClick={handleLogout}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <h1 className="text-3xl font-bold">Please log in or sign up</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
