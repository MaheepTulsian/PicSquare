import React, {useState, useEffect } from 'react';
import { useLocation , Link } from 'react-router-dom'
import { UserIcon, PhotoIcon, PlusIcon, ArchiveBoxArrowDownIcon, HeartIcon, CreditCardIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline'
import ProfileBox from './ProfileBox';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = () => {
  const { pathname } = useLocation();
  const subpage = pathname.split("/dashboard/")?.[1];
  // console.log(subpage);
  function Linkness(type) {
    let classes = "w-5/6 h-10 rounded-lg flex items-center justify-start hover:bg-indigo-600";
    if (type === subpage) {
      classes += " bg-indigo-600";
    }
    return classes;
  }

  const handleLogout = () => {
    fetch('https://pic-square-backend-6k6ybz7b5-maheeps-projects.vercel.app//api/logout', {
      method: 'GET',
      credentials: 'include',
    })
    .then((response) => {
      if (response.ok) {
        toast.success('Logout Successful');
        console.log('Logout Successful');
        //wait for 2 seconds before redirecting to main page
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        toast.error('Failed to logout');
        console.log('Failed to logout');
        throw new Error('Failed to logout, Status: ' + response.status);
      }
    })
    .catch((error) => {
      console.log('Failed to logout', error);
    });
  };

  const [userData, setUserData] = useState({});

  const getUser = async () => {
    try {
      const response = await fetch('https://pic-square-backend-6k6ybz7b5-maheeps-projects.vercel.app//api/showUser', {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) {
        if (response.status === 401) {
          console.log('User not logged in');
          return;
        } else {
          throw new Error('HTTP error: ' + response.status);
        }
      }
      const data = await response.json();
      console.log(data);
      setUserData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
    <div className="w-1/5 fixed top-4 left-6 bottom-4 py-10 pl-10 flex flex-col items-start justify-between gap-3 overflow-hidden rounded-3xl z-50">
      
      {/* Quick Links  */}
      <div className="w-full flex flex-col items-start gap-3">

        <div className='w-5/6 pb-4 border-b-2 flex items-center justify-center'>
          <p className='text-3xl text-white'>PictureSquare</p>
        </div>

        {/* <Link to="../dashboard/artists" className={Linkness("artists")}>
          <UserIcon className='ml-2 text-white h-6 w-auto' />
          <p className='ml-3 text-white text-sm lg:text-lg'>Artists</p>
        </Link> */}

        <Link to="../dashboard/arts" className={Linkness("arts")}>
          <PhotoIcon className='ml-2 text-white h-6 w-auto' />
          <p className='ml-3 text-white text-sm lg:text-lg'>Artworks</p>
        </Link>

        <Link to="../dashboard/create" className={Linkness("create")}>
          <PlusIcon className='ml-2 text-white h-6 w-auto' />
          <p className='ml-3 text-white text-sm lg:text-lg'>Create Art</p>
        </Link>

        <Link to="../dashboard/myart" className={Linkness("myart")}>
          <ArchiveBoxArrowDownIcon className='ml-2 text-white h-6 w-auto' />
          <p className='ml-3 text-white text-sm lg:text-lg'>My Artworks</p>
        </Link>

        <Link to="../dashboard/mycollection" className={Linkness("mycollection")}>
          <HeartIcon className='ml-2 text-white h-6 w-auto' />
          <p className='ml-3 text-white text-sm lg:text-lg'>My collection</p>
        </Link>

        {/* <Link to="../user/purchasehistory" className={Linkness("purchasehistory")}>
          <CreditCardIcon className='ml-2 text-white h-6 w-auto' />
          <p className='ml-3 text-white text-sm lg:text-lg'>My Purchases</p>
        </Link> */}

      </div>
      
      <div className='w-5/6 flex flex-col items-center justify-center gap-5'>
        
        <ProfileBox 
          avatar={userData.avatar_url}
          firstName={userData.first_name}
          lastName={userData.last_name}
        />

        <button onClick={handleLogout} className='w-full h-10 rounded-lg flex items-center justify-center bg-red-500'> {/*  [#f5c754] */}
          <ArrowLeftEndOnRectangleIcon className=' text-black h-6 w-auto' />
          <p className='ml-3 text-black text-sm lg:text-lg font-semibold'>Logout</p>
        </button>
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default Sidebar;