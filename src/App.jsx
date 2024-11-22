import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Paste from './components/Paste';
import LocomotiveScroll from 'locomotive-scroll';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/docs",
    element: (
      <>
        <Navbar />
        <Paste />
      </>
    ),
  },
]);

const locomotiveScroll = new LocomotiveScroll();

function App() {
  return (
    <div className='w-full font-["Gilroy"] bg-[#000] min-h-screen overflow-hidden'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
