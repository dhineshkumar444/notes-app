
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();

  // Split the pathname into parts and filter out empty strings
  const pathParts = location.pathname.split('/').filter((part) => part);

  // Build breadcrumb links dynamically
  const breadcrumbs = pathParts.map((part, index) => {
    const path = `/${pathParts.slice(0, index + 1).join('/')}`;
    return {
      label: part.charAt(0).toUpperCase() + part.slice(1), // Capitalize the label
      to: index !== pathParts.length - 1 ? path : null, // Only add `to` for non-active breadcrumb
    };
  });

  return (
    <div className='bg-[#f4f1de]'>
    <nav
      className="w-full lg:w-[80%] mx-auto text-gray-600 text-sm p-4 "
      aria-label="breadcrumb"
    >
      <ul className="flex space-x-2">
        {/* Add the home link manually */}
        <li className="flex items-center">
          <Link to="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index} className="flex items-center">
            <span className="mr-1 text-gray-400">/</span>
            {breadcrumb.to ? (
              <Link to={breadcrumb.to} className="text-blue-600 hover:underline">
                {breadcrumb.label}
              </Link>
            ) : (
              <span className="text-gray-500">{breadcrumb.label}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
    </div>
  );
};

export default Breadcrumb;
