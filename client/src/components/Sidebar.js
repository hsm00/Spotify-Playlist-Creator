import React, { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import classNames from 'classnames';


const Sidebar = ({playlists}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const matches = useMediaQuery('(max-width:300px)');

  // create a useEffect which runs only by the first render
    useEffect(() => {
      if (matches === true) {
        setIsOpen(false);
      }
    }, []);


  useEffect(() => {
    if (matches === true) {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.sidebar')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }
  }, [isOpen]);

  return (
    
    <div className="fixed top-0 left-0 h-screen  m0  text-white ">
      {/* Hamburger icon */}
      <button
        className="fixed top-4 left-4 z-50 block lg:hidden"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} size="2x" />
      </button>

      {/* Sidebar */}
      <div
        className={`flex flex-col h-full overflow-y-scroll bg-black text-white shadow-lg ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <h1 className="relative flex items-center justify-center font-bold mt-4">
          Your Playlists
        </h1>
        <a
          href="/dashboard"
          className="inline-flex m-4 p-2 items-center hover:text-green-600 border-dashed rounded border-2 border-grey-500 hover:border-green-600"
        >
          <FontAwesomeIcon icon={faPlus} className="" />
          <p className="pl-2 font-bold">New Playlist</p>
        </a>

        <div className="flex flex-col m-2 h-full ">
          {playlists.map((playlist) => (
            <Link
              key={playlist.id}
              to={`/dashboard/${playlist.id}`}
              className="mt-3 hover:text-zinc-400 "
            >
              {playlist.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
