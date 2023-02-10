import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const Sidebar = ({playlists}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 h-screen w-64 m0
                flex flex-col
                bg-zinc-900 text-white shadow-lg">
  
    

    <h1 className="relative flex items-center justify-center font-bold mt-4">Your Playlists</h1>
      <a  href="#"className="inline-flex m-4 p-2 items-center hover:text-green-600 border-dashed rounded border-2 border-grey-500 hover:border-green-600">
        <FontAwesomeIcon icon={faPlus} className=""> </FontAwesomeIcon>
        <p className='pl-2 font-bold'>  New Playlist </p>
      </a>


      <div className="flex flex-col m-2 h-screen overflow-y-scroll ">
        {playlists.map((playlist) => (
          <Link key={playlist.id} to={`/dashboard/${playlist.id}`} className="mt-3 hover:text-zinc-400">{playlist.name}</Link>
        ))
        }
        
      </div>
    
  <div className="  flex flex-col justify-end h-22">
    <ul className="">
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
