import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

// Tab component for individual navigation links
const Tab = ({ children, setPosition, to }) => {
  const ref = useRef(null); // Reference to the current tab element

  return (
    <li
      ref={ref} // Assign the ref to the list item for measuring size and position
      onMouseEnter={() => {
        if (!ref?.current) return; // Check if the ref is valid

        // Get the width of the tab and update the cursor's position and size
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft, 
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-4 py-2 text-sm uppercase text-white md:px-6 md:py-3 md:text-base"
    >
      <NavLink 
        to={to} 
        className="font-medium"
        activeClassName="border-b-2 " 
      >
        {children} 
      </NavLink>
    </li>
  );
};

// Cursor component for the sliding effect
const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        left: position.left,     // Animate the cursor's left position
        width: position.width,   // Animate the cursor's width
        opacity: position.opacity // Animate the cursor's opacity
      }}
      className="absolute z-0 h-8 rounded-full bg-[#ea7a53] md:h-12" 
    />
  );
};


const Navbar = () => {
  // State to track the position and size of the active tab's cursor
  const [position, setPosition] = useState({
    left: 0,      
    width: 0,     
    opacity: 0, 
  });

  return (
    <div className='flex justify-center'>
      <div className="relative border-2 border-[#6c757d] rounded-full py-1 px-3 mt-2 bg-[#000]">
        <ul
          // Set cursor opacity to 0 when mouse leaves the tabs
          onMouseLeave={() => {
            setPosition((pv) => ({
              ...pv,
              opacity: 0,
            }));
          }}
          className="flex flex-wrap md:flex-nowrap w-fit p-1"
        >
          <Tab setPosition={setPosition} to="/" exact>
            Home
          </Tab>
          <Tab setPosition={setPosition} to="/pastes">
            Docs
          </Tab>

          {/* Cursor for sliding effect */}
          <Cursor position={position} />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
