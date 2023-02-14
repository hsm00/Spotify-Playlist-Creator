import React from 'react';

const Navbar = ({user}) => {
  return (
    
        <nav className="flex h-20 w-screen justify-end  ">
            <div className="inline-flex m-4 items-center border-solid rounded-full bg-black">
            <img className=" m-1 rounded-full w-7 h-7" src={user.image} alt="user" />
            <p className="text-white text-x p-1 font-thin">{user.name}</p> 

            </div>
        </nav>

  );
}

export default Navbar;
