import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Card = ({ id, title, price, image, author_img, author_name, isFavorite }) => {
  const link = `../${id}`;

  const [isCurrentlyFavorite, setIsCurrentlyFavorite] = useState(isFavorite);

  useEffect(() => {
    localStorage.setItem(`favorite_${id}`, JSON.stringify(isCurrentlyFavorite));
  }, [id, isCurrentlyFavorite]);
  
  useEffect(() => {
    const favoriteStatus = localStorage.getItem(`favorite_${id}`);
    if (favoriteStatus !== null) {
      setIsCurrentlyFavorite(JSON.parse(favoriteStatus));
    }
  }, [id]);

  const toggleFavorite = async () => {
    try {
      if (isCurrentlyFavorite) {
        console.log(`${id} removed from favorites`);
        const response = await fetch(`http://localhost:3000/api/removeFavourite`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ art_id: id }),
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('HTTP error: ' + response.status);
        }
        setIsCurrentlyFavorite(false);
        localStorage.setItem(`favorite_${id}`, false);
        console.log('Removed from favorites');
      } else {
        console.log(`${id} added to favorites`);
        const response = await fetch(`http://localhost:3000/api/addFavourite`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ art_id: id }),
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('HTTP error: ' + response.status);
        }
        setIsCurrentlyFavorite(true);
        localStorage.setItem(`favorite_${id}`, true);
        console.log('Added to favorites');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
      <div
        className="absolute top-2 left-2 z-10 p-1 rounded-full bg-white text-gray-800 hover:text-red-500 focus:outline-none"
        onClick={toggleFavorite}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${isCurrentlyFavorite ? 'fill-current text-red-500' : 'stroke-current'}`}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7.561a3.18 3.18 0 0 0-2.414-1.134c-.937 0-1.822.39-2.586 1.098l-.771.679-.771-.679A3.49 3.49 0 0 0 9.414 6.43 3.18 3.18 0 0 0 7 7.561c-1.18 1.413-1.298 3.71.219 5.567l5.324 5.566a.5.5 0 0 0 .707 0l5.324-5.566c1.516-1.857 1.398-4.154.219-5.567z"
          />
        </svg>
      </div>
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" onContextMenu={(e) => e.preventDefault()} />
        <Link to={link} className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity"></Link>
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
