import React, { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 h-screen w-64 m0
                flex flex-col
                bg-zinc-900 text-white shadow-lg">
  
  <div>
    <h1 className="relative flex items-center justify-center font-bold mt-2">Your Playlists</h1>
  </div>

  <div className="flex-grow justify-end">
    <ul className="">
      <li>
        <a className="sidebar-icon" href="#">Home</a>
      </li>
      <li>
        <a className="sidebar-icon" href="#">About</a>
      </li>
      <li>
        <a className="sidebar-icon" href="#">Contact</a>
      </li>
    </ul>
  </div>
</div>
    
  );
};

export default Sidebar;
