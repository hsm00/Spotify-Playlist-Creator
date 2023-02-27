import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.svg';

const Navbar = ({user}) => {
  return (
    
    <nav className="flex w-screen justify-end  ">
       <Link to="/" className="my-auto w-24 inline-flex">

         <img src={Logo} alt="Spotify Logo" className="my-auto w-24 " />
       </Link>

  <div className="inline-flex m-4 items-center border-solid rounded-full bg-black h-8">
    <img className="m-1 rounded-full w-7 h-7" src={user.image} alt="user" />
    <p className="text-white text-x p-1 font-thin">{user.name}</p> 
  </div>
</nav>
        

  );
}

export default Navbar;
