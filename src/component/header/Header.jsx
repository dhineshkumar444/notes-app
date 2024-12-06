import React, { useState } from 'react';
import { NAV_LINKS } from '../../utils/constant';
import { Link } from 'react-router-dom';

const Header = () => {
  // State to toggle the mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-gray-800">
      <header className="flex justify-between items-center p-4 text-white w-full lg:w-[80%] mx-auto">
       <Link to={"/"}> <div className="text-xl font-bold">Keep Notes</div></Link>
        
        {/* Hamburger icon for mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}  // Toggle the menu visibility
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div className=" text-white flex items-center justify-center max-md:hidden p-2 gap-5">
          {/* Close (cross) icon */}
         

          {/* Navigation Links */}
          {/* Here I showcased to use config-driven UI */}
          {NAV_LINKS.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-lg hover:text-gray-400"
              onClick={() => setIsMenuOpen(false)} // Close menu on link click (mobile)
            >
              {link.label}
            </a>
          ))}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-10 lg:hidden" onClick={() => setIsMenuOpen(false)}></div>
      )}

      {/* Mobile Navigation Links */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-20 bg-gray-800 text-white flex flex-col items-center justify-center space-y-6 p-4 md:hidden">
          {/* Close (cross) icon */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Navigation Links */}
          {NAV_LINKS.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-lg hover:text-gray-400"
              onClick={() => setIsMenuOpen(false)} // Close menu on link click (mobile)
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
     
    </div>
  );
};

export default Header;
