import React, { useState } from 'react';
import { useFormik } from 'formik';
import { FaInstagram } from "react-icons/fa6";
import { LuScrollText } from "react-icons/lu";
import { HiOutlineCursorArrowRipple } from "react-icons/hi2";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AvatarSelector = () => {
  const heads = [
    "afro", "bangs", "bangs2", "bantuKnots", "bear", "bun", "bun2", "buns", "cornrows",
    "cornrows2", "dreads1", "dreads2", "flatTop", "flatTopLong", "grayBun", "grayMedium",
    "grayShort", "hatBeanie", "hatHip", "hijab", "long", "longAfro", "longBangs", "longCurly",
    "medium1", "medium2", "medium3", "mediumBangs", "mediumBangs2", "mediumBangs3", "mediumStraight",
    "mohawk", "mohawk2", "noHair1", "noHair2", "noHair3", "pomp", "shaved1", "shaved2", "shaved3",
    "short1", "short2", "short3", "short4", "short5", "turban", "twists", "twists2"
  ];

  const defaultUrl = "https://api.dicebear.com/8.x/open-peeps/svg?head=noHair1&face=smile";
  const [selectedUrl, setSelectedUrl] = useState(defaultUrl);

  const handleUrlChange = (head) => {
    const url = `https://api.dicebear.com/8.x/open-peeps/svg?head=${head}&face=smile`;
    setSelectedUrl(url);
  };

  function handleChange(e) {
    console.log(e.target.files);
    setSelectedUrl(URL.createObjectURL(e.target.files[0]));
    uploadImageToCloudinary(e.target.files[0]);
  }

  async function uploadImageToCloudinary(img) {
    try {
      const formData = new FormData();
      formData.append('image', img);

      const res = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to upload image to Cloudinary');
      }

      const data = await res.json();
      console.log(data.data.url);
      setSelectedUrl(data.data.url);
      return data.url;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const Formik = useFormik({
    initialValues: {
      avatar_url: '',
      bio: '',
      instagram: '',
      website: '',
    },
    onSubmit: async (values) => {
      try {
        const res = await fetch('http://localhost:3000/api/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            avatar_url: selectedUrl,
            bio: values.bio,
            instagram: values.instagram,
            website: values.website,
          }),
        });

        if (!res.ok) {
          toast.error('Failed to update profile');
          throw new Error('Failed to update profile');
        }
        toast.success('Profile updated successfully');
        console.log('Profile updated successfully');
        //wait for 3 seconds before redirecting to dashboard
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 3000);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className='w-screen h-screen bg-gray-900'>
      <form onSubmit={Formik.handleSubmit} className="w-full h-full flex flex-col justify-center items-center gap-10">
        <div className='w-full h-1/2 flex'>
          <div className='flex flex-col items-center justify-center h-full w-1/2'>
            <div className='flex items-center justify-center mb-4'>
              <img
                src={selectedUrl}
                alt="Selected Avatar"
                className="w-36 h-36 rounded-full border-2 border-indigo-600 p-1 mb-2"
              />
            </div>
            <div className='mb-4 h-2/4'>
              <div className='w-full h-full overflow-y-scroll scrollbar px-2 grid grid-cols-5 gap-4'>
                {heads.map((head, index) => (
                  <img
                    key={index}
                    src={`https://api.dicebear.com/8.x/open-peeps/svg?head=${head}&face=smile`}
                    className="w-12 h-12 rounded-full p-1 cursor-pointer m-2"
                    onClick={() => handleUrlChange(head)}
                    alt={head}
                  />
                ))}
              </div>
              <div className='w-full my-2 flex items-center'>
                <div className='flex-grow border-t border-gray-400'></div>
                <span className='mx-2 text-gray-400'>or</span>
                <div className='flex-grow border-t border-gray-400'></div>
              </div>
            </div>
            <div className="w-full mt-4 flex-center relative">
              {/* FileUpload */}
              <div className="mb-3 w-96">
                <label
                  htmlFor="formFile"
                  className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                >
                  Choose your own image
                </label>
                <input
                  className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className='flex flex-col items-center justify-center h-full w-1/3'>
            <h1 className='w-full text-3xl font-bold align-center flex-center mb-14 text-white'>Create your Profile</h1>
            <div className='w-full mb-4'>
              <label htmlFor="bio" className="sr-only">Bio</label>
              <div className='flex items-center gap-3'>
                <LuScrollText className='text-white text-3xl' />
                <input
                  as="textarea"
                  id="bio"
                  name='bio'
                  required
                  value={Formik.values.bio}
                  onChange={Formik.handleChange}
                  className="w-full px-3 py-2 rounded-md focus:outline-none"
                  placeholder="Bio"
                />
              </div>
            </div>
            <div className='w-full mb-4'>
              <label htmlFor="instagram" className="sr-only"> Instagram Handle</label>
              <div className='flex items-center gap-3'>
                <FaInstagram className='text-white text-3xl' />
                <input
                  id="instagram"
                  type="text"
                  required
                  value={Formik.values.instagram}
                  onChange={Formik.handleChange}
                  className="w-full px-3 py-2 rounded-md focus:outline-none"
                  placeholder="Instagram Handle"
                />
              </div>
            </div>
            <div className='w-full mb-8'>
              <label htmlFor="website" className="sr-only">Website URL</label>
              <div className='flex items-center gap-3'>
                <HiOutlineCursorArrowRipple className='text-white text-3xl' />
                <input
                  id="website"
                  type="text"
                  required
                  value={Formik.values.website}
                  onChange={Formik.handleChange}
                  className="w-full px-3 py-2 rounded-md focus:outline-none"
                  placeholder="Website URL"
                />
              </div>
            </div>
            <div className='w-full flex justify-center items-center p-4'>
              <button
                type="submit"
                className="w-full py-3 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default AvatarSelector;
