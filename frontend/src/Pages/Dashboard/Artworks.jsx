import React, { useState, useEffect } from 'react';
import ArtCard from '../../Components/ArtCard';

const Artworks = () => {
  const [art, setArt] = useState([]);

  const fetchArt = async () => {
    try {
      const artResponse = await fetch('http://localhost:3000/api/getAllArt', {
        credentials: 'include'
      });

      if (!artResponse.ok) {
        if (artResponse.status === 401) {
          console.log('User not logged in');
          // window.location.href = '/login';
          return;
        } else {
          throw new Error('HTTP error: ' + artResponse.status);
        }
      }

      const favoriteResponse = await fetch('http://localhost:3000/api/getUserFavorites', {
        credentials: 'include'
      });

      if (!favoriteResponse.ok) {
        throw new Error('HTTP error: ' + favoriteResponse.status);
      }

      const artData = await artResponse.json();
      const favoriteData = await favoriteResponse.json();

      // Update each artwork to include a flag indicating if it's a favorite
      const updatedArt = artData.map(artwork => {
        return {
          ...artwork,
          isFavorite: favoriteData.some(favorite => favorite._id === artwork._id)
        };
      });

      setArt(updatedArt);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchArt();
  }, []);

  return (
    <div className='w-full p-6 overflow-y-scroll no-scrollbar text-white grid md:grid-cols-4 2xl:grid-cols-5 gap-5 place-items-center'>
      {art.map(item => (
        <ArtCard
          key={item._id}
          id={item._id}
          title={item.title}
          price={item.price}
          image={item.image_url}
          author_img={item.author_avatar}
          author_name={`${item.author_first_name} ${item.author_last_name}`}
          isFavorite={item.isFavorite} // Pass isFavorite prop to ArtCard
        />
      ))}
    </div>
  );
};

export default Artworks;
