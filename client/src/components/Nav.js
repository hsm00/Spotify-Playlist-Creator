import React from 'react';

const Navbar = ({user}) => {
  return (
    <nav className="">
         {user.name}
       <img className=" m-1 rounded-full w-9 h-9" src={user.image} alt="user" />
    </nav>
  );
}

export default Navbar;
