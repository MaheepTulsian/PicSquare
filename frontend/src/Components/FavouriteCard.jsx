import React, { useState, useEffect } from 'react';

const Card = ({ id, title, price, image, author_img, author_name, isFavorite }) => {
  

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
      {/* <div
        className="absolute top-2 left-2 z-10 p-1 rounded-full bg-white text-gray-800 hover:text-red-500 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 'fill-current text-red-500 stroke-current'}`}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7.561a3.18 3.18 0 0 0-2.414-1.134c-.937 0-1.822.39-2.586 1.098l-.771.679-.771-.679A3.49 3.49 0 0 0 9.414 6.43 3.18 3.18 0 0 0 7 7.561c-1.18 1.413-1.298 3.71.219 5.567l5.324 5.566a.5.5 0 0 0 .707 0l5.324-5.566c1.516-1.857 1.398-4.154.219-5.567z"
          />
        </svg>
      </div> */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" onContextMenu={(e) => e.preventDefault()} />
        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity"></div>
        <div className="absolute top-2 right-2 bg-gray-800 text-white rounded-full px-2 py-1 text-xs font-semibold">
          $ {price}
        </div>
      </div>
      <div className="p-2 md:p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
        <div className="flex items-center">
          <img src={author_img} alt="" className="w-8 h-8 rounded-full mr-2" />
          <h3 className="text-sm font-medium text-gray-700">{author_name}</h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
