import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  
  const Formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        // Send a POST request to the server
        const url = 'https://pic-square-backend-6k6ybz7b5-maheeps-projects.vercel.app/api/signup';
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
          credentials: 'include',
        });

        if (response.ok) {
          //toast notification for successful signup
          toast.success('Signup Successful');
          console.log('Signup Successful');
          //wait for 3 seconds before redirecting to dashboard
          setTimeout(() => {
            window.location.href = '/profile';
          }, 3000);
        } else {
          toast.error('Failed to signup');
          throw new Error('Failed to signup, Status: ' + response.status);
        }
      } catch (error) {
        //toast notification for failed signup
        console.log('Failed to signup', error);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign Up to our Platform</h2>
        </div>
        <form onSubmit={Formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first_name" className="sr-only">First Name</label>
              <input
                id="first_name"
                type="text"
                value={Formik.values.first_name}
                onChange={Formik.handleChange}
                required
                className="appearance-none relative block w-full px-3 py-2 bg-gray-800 border border-gray-600 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="First Name"
              />
            </div>
            <div>
              <label htmlFor="last_name" className="sr-only">Last Name</label>
              <input
                id="last_name"
                type="text"
                value={Formik.values.last_name}
                onChange={Formik.handleChange}
                required
                className="appearance-none relative block w-full px-3 py-2 bg-gray-800 border border-gray-600 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email Address</label>
            <input
              id="email"
              type="email"
              value={Formik.values.email}
              onChange={Formik.handleChange}
              required
              className="appearance-none relative block w-full px-3 py-2 bg-gray-800 border border-gray-600 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email Address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              type="password"
              value={Formik.values.password}
              onChange={Formik.handleChange}
              required
              className="appearance-none relative block w-full px-3 py-2 bg-gray-800 border border-gray-600 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <span className="font-medium text-indigo-600">
                Already have an account?
                <Link to='/login' className="ml-1 font-medium hover:text-indigo-500">
                  LogIn
                </Link>
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Signup;
