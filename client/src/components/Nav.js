import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({user}) => {
  return (
    
    <nav className="flex w-screen justify-end">
  <Link to="/dashboard/about" className="inline-flex items-center p-3 hover:text-gray-900">About</Link>
  <Link to="/dashboard/Contact" className="inline-flex items-center hover:text-gray-900">Contact</Link>
  <div className="inline-flex m-4 items-center border-solid rounded-full bg-black">
    <img className="m-1 rounded-full w-7 h-7" src={user.image} alt="user" />
    <p className="text-white text-x p-1 font-thin">{user.name}</p> 
  </div>
</nav>
        

  );
}

export default Navbar;
