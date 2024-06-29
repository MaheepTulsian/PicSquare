import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginFormDarkTheme = () => {
  
  const Formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        // Send a POST request to the server
        const url = 'https://pic-square-backend-6k6ybz7b5-maheeps-projects.vercel.app/api/login';
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
          credentials: 'include',
        });

        if (response.ok) {
          //toast notification for successful login
          toast.success('Login Successful');
          console.log('Login Successful');
          //wait for 3 seconds before redirecting to dashboard
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 3000);
        } else {
          toast.error('Failed to login');
          throw new Error('Failed to login, Status: ' + response.status);
        }
      } catch (error) {
        //toast notification for failed login
        console.log('Failed to login', error);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={Formik.handleSubmit}>
          
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={Formik.values.email}
                onChange={Formik.handleChange}
                className="appearance-none relative block w-full px-3 py-2 bg-gray-800 border border-gray-600 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={Formik.values.password}
                onChange={Formik.handleChange}
                className="appearance-none relative block w-full px-3 py-2 bg-gray-800 border border-gray-600 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
                <span className="font-medium text-indigo-600">
                    Doesn't have a profile? 
                    <Link to='/signup' className="ml-1 font-medium hover:text-indigo-500">
                        SignUp
                    </Link>
                </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default LoginFormDarkTheme;