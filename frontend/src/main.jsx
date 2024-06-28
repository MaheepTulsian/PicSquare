// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { createRoutesFromElements } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App';
import LandingPage from './Pages/LandingPage/LandingPage';

// Authentication Routes
import Login from './Pages/Authentication/Login';
import Signup from './Pages/Authentication/Signup';
import Profile from './Pages/Authentication/Profile';

// Dashboard Routes
import Dashboard from './Pages/Dashboard/Dashboard';
import Default from './Pages/Dashboard/Default';
import Artworks from './Pages/Dashboard/Artworks';
import Artists from './Pages/Dashboard/Artists';
import MyArtworks from './Pages/Dashboard/MyArtworks';
import MyCollection from './Pages/Dashboard/MyCollection';
import Create from './Pages/Dashboard/CreateForm';
import AI from './Pages/Dashboard/CreateAI';
import ArtDescription from './Pages/Dashboard/ArtDescription';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />} >

      <Route path="" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="/dashboard" element={<Dashboard />} >
        <Route path="/dashboard/" element={<Default />} />

        <Route path="/dashboard/:id" element={<ArtDescription />} />

        <Route path="/dashboard/arts" element={<Artworks />} />
        <Route path="/dashboard/artists" element={<Artists />} />

        <Route path="/dashboard/create" element={<Create />} />
        <Route path="/dashboard/create/AI" element={<AI />} />

        <Route path="/dashboard/myart" element={<MyArtworks />} />
        <Route path="/dashboard/mycollection" element={<MyCollection />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
