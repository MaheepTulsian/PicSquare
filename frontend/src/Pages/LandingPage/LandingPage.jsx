import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

import IMG from './../../assets/canvas.png'

const LandingPage = () => {
  return (
    <>
    <Navbar />
    {/* <div className='h-screen bg-gray-800 flex items-center justify-center'>
      Content
      <img src={IMG} alt="" />
    </div> */}
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-16 px-10 flex flex-col md:flex-row items-center justify-center">
        <div className="md:w-1/2 px-8">
          <h1 className="text-4xl font-bold text-center md:text-left text-gray-800 mb-4">
            Empower Your 
          </h1>
          <h1 className="text-5xl font-bold text-center md:text-left text-gray-800 mb-4">
            Creativity with 
          </h1>
          <h1 className="text-6xl font-bold text-center md:text-left text-gray-800 mb-4">
            PictureSquare
          </h1>
          <p className="text-lg text-center md:text-left text-gray-600">
            Discover, Create, and Own Digital Art like Never Before
          </p>
        </div>
        <div className="md:w-1/2 px-8">
          <img src="https://source.unsplash.com/random/1920x1920?art" alt="PictureSquare" className="rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-10 py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Explore Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="flex flex-col items-center">
              <img src="https://source.unsplash.com/random/1920x1920?asset" alt="Feature 1" className="mb-4 rounded-lg shadow-lg" />
              <p className="text-lg text-gray-700 text-center">
                Upload and Mint your Artworks as public Assets
              </p>
            </div>
            {/* Feature 2 */}
            <div className="flex flex-col items-center">
              <img src="https://source.unsplash.com/random/1920x1920?image-AI" alt="Feature 2" className="mb-4 rounded-lg shadow-lg" />
              <p className="text-lg text-gray-700 text-center">
                Generate Digital Art from Text with AI
              </p>
            </div>
            {/* Feature 3 */}
            <div className="flex flex-col items-center">
              <img src="https://source.unsplash.com/random/1920x1920?webpage" alt="Feature 3" className="mb-4 rounded-lg shadow-lg" />
              <p className="text-lg text-gray-700 text-center">
                Sleek Dashboard for Seamless Art Exploration
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-800 py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join PictureSquare Today and Dive into the World of Digital Art!
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Discover, Collect, and Create Unique Artworks with Ease
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg shadow-lg">
            Get Started
          </button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white px-10 py-20">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
              <p className="text-lg text-gray-800">
                "PictureSquare transformed the way I showcase and sell my digital art. The platform is intuitive
                and user-friendly, making it easy for both artists and collectors to navigate."
              </p>
              <p className="text-gray-600 mt-4">- Sarah, Digital Artist</p>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
              <p className="text-lg text-gray-800">
                "As an art enthusiast, I love browsing through PictureSquare's diverse collection of digital
                artworks. The quality of the pieces and the seamless checkout process keep me coming
                back for more."
              </p>
              <p className="text-gray-600 mt-4">- Michael, Art Collector</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  )
}

export default LandingPage
