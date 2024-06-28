import React, {useState, useEffect} from 'react'
import MyCard from '../../Components/MyCard'

const MyArtworks = () => {
  const [art , setArt] = useState([]);

  const fetchArt = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/getUserArt', {
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.log('User not logged in');
          // window.location.href = '/login';
          return;
        } else {
          throw new Error('HTTP error: ' + response.status);
        }
      }
      const data = await response.json();
      console.log(data);
      setArt(data);
    } catch (error) {
      console.error('Error:', error);
    };
  }

  useEffect(() => { fetchArt() }  , []);

  return (
    <div className='w-full p-6 overflow-y-scroll no-scrollbar text-white grid md:grid-cols-4 2xl:grid-cols-8 gap-5 place-items-center'>
      {art.map(item => (
        <MyCard 
          key={item._id} 
          title={item.title} 
          price={item.price} 
          image={item.image_url}
          
        />
      ))}
    </div>
  )};

export default MyArtworks;