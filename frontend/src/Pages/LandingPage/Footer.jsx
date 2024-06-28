import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 pt-8 pb-6 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Column 1 */}
          <div className="grid grid-cols-1 gap-4 xl:col-span-1">
            <div>
              <p className="text-white font-bold text-xl">PictureSquare</p>
              <p className="mt-2 text-gray-400">123 Street Name, City, Country</p>
              <p className="mt-2 text-gray-400">info@picturesquare.com</p>
            </div>
          </div>
          {/* Column 2 */}
          <div className="grid grid-cols-1 gap-4 xl:col-span-2 xl:grid-cols-2">
            <div className='flex flex-col'>
              <p className="text-white font-bold">About</p>
              <a href="#" className="mt-2 text-gray-400 hover:text-white">About Us</a>
              <a href="#" className="mt-2 text-gray-400 hover:text-white">Our Team</a>
              <a href="#" className="mt-2 text-gray-400 hover:text-white">Careers</a>
            </div>
            <div className='flex flex-col'>
              <p className="text-white font-bold">Services</p>
              <a href="#" className="mt-2 text-gray-400 hover:text-white">Web Design</a>
              <a href="#" className="mt-2 text-gray-400 hover:text-white">Graphic Design</a>
              <a href="#" className="mt-2 text-gray-400 hover:text-white">SEO</a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 xl:flex xl:items-center xl:justify-between">
          <p className="text-gray-400">© 2024 PictureSquare. All rights reserved.</p>
          {/* <div className="mt-4 xl:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">
              <span className="sr-only">Facebook</span>
              <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M17 3h-2c-1.102 0-2 .898-2 2v2H9v3h4v9h3v-9h3l1-3h-4V5c0-.552-.448-1-1-1z" />
              </svg>
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
