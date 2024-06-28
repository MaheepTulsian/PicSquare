import React, { useState, useEffect } from 'react';
import FavouriteCard from '../../Components/FavouriteCard';

const MyCollection = () => {
  const [favorite, setFavorite] = useState([]);
  const [error, setError] = useState(null);

  const fetchFavorite = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/getUserFavorites', {
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.log('User not logged in');
          window.location.href = '/login'; // Redirect to login page
          return;
        } else {
          throw new Error('HTTP error: ' + response.status);
        }
      }

      const data = await response.json();
      console.log(data);
      setFavorite(data);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message); // Set error state
    }
  };

  useEffect(() => {
    fetchFavorite();
  }, []);

  return (
    <div className='w-full p-6 overflow-y-scroll no-scrollbar text-white grid md:grid-cols-4 2xl:grid-cols-8 gap-5 place-items-center'>
      {error && <div>Error: {error}</div>}
      {favorite.length === 0 && <div>No favorites found.</div>}
      {favorite.map(item => (
        <FavouriteCard
          key={item._id} 
          id={item._id}
          title={item.title} 
          price={item.price} 
          image={item.image_url}
          author_img={item.author_avatar}
          author_name={`${item.author_first_name} ${item.author_last_name}`}
          isFavorite={item.isFavorite}
        />
      ))}
    </div>
  );
};

export default MyCollection;
