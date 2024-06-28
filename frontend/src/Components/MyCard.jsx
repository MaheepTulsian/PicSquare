import React from 'react';

const Card = ({ image, title, price }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity"></div>
        <div className="absolute top-2 right-2 bg-gray-800 text-white rounded-full px-2 py-1 text-xs font-semibold">
          $ {price}
        </div>
      </div>
      <div className="p-2 md:p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>
      </div>
    </div>
  );
};

export default Card;
