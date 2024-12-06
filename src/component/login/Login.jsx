
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginSignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState(''); // State for username
  const [isLogin, setIsLogin] = useState(true); // Tracks whether the user is on the login form or sign-up form
  const [error, setError] = useState('');

  useEffect(() => {
    // Update URL when toggling between Login/Sign Up forms
    if (isLogin) {
      navigate('/login');
    } else {
      navigate('/signup');
    }
  }, [isLogin, navigate]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Retrieve the list of users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the credentials match any user
    const user = users.find((user) => user.email === email && user.password === password);

    if (user) {
      // Redirect to the home page after successful login

      localStorage.setItem('currentUser', JSON.stringify(user));
      const users = JSON.parse(localStorage.getItem('users')) || [];

      // Update the logged-in status of the current user
      const updatedUsers = users.map((u) =>
        u.email === user.email ? { ...u, loggedIn: true } : u
      );
  
      // Save the updated list of users to localStorage
      localStorage.setItem('users', JSON.stringify(updatedUsers));


      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    // Retrieve the current list of users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email is already registered
    if (users.some((user) => user.email === email)) {
      alert('This email is already registered.');
      return;
    }

    // Create a new user object
    const newUser = { username, email, password, loggedIn: true, notes: []  };

    // Add the new user to the list
    users.push(newUser);

    // Save the updated list back to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Redirect to the login page after successful sign-up
    setIsLogin(true);
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh] bg-[#f4f1de]">
      <div className="w-full max-w-sm p-6 bg-[#f4f1de] rounded-lg shadow-lg border-black border">
        {/* Toggle Buttons for Login / Sign Up */}
        <div className="flex justify-around mb-4">
          <button
            className={`w-1/2 py-2 ${isLogin ? 'bg-[#e9b384]' : 'border-4 border-[#4ade80]'} rounded-l-lg text-black font-semibold`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 ${!isLogin ? 'bg-[#4ade80]' : 'border-4 border-[#e9b384]'} rounded-r-lg text-black font-semibold`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {/* Conditionally render the Login or Sign Up form */}
        {isLogin ? (
          <form onSubmit={handleLoginSubmit}>
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full py-1 px-2 border border-black rounded-xl mt-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full py-1 px-2 border border-black rounded-xl mt-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#e9b384] text-black font-semibold p-2 rounded-xl mt-4"
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUpSubmit}>
            <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="w-full py-1 px-2 border border-black rounded-xl mt-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="w-full py-1 px-2 border border-black rounded-xl mt-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full py-1 px-2 border border-black rounded-xl mt-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full py-1 px-2 border border-black rounded-xl mt-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#4ade80] text-black font-semibold p-2 rounded-xl mt-4"
            >
              Sign Up
            </button>
          </form>
        )}

        {/* Switch between Login and Sign Up */}
        <div className="mt-4 text-center">
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setIsLogin(true)}
              >
                Login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
