import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Images/logo.svg';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useLoader } from "@react-three/fiber";       
import { TextureLoader } from "three/src/loaders/TextureLoader";
import Box from "./Box";

const Navbar = ({user}) => {
  return (  
    
    <nav className="flex w-screen justify-end ">

       <div className="my-auto w-32 inline-flex mr-2">
              <Canvas className="canvas " style="">
                  <ambientLight intensity={0.8}/>
                  <directionalLight position={[-3, 5, 2]} intensity={1} />
                  <OrbitControls enableZoom={false}/>
                  <Suspense fallback={null}>
                      <Box />
                  </Suspense>
              </Canvas>
              </div>

  <div className="flex   items-center border-solid rounded-full bg-black h-9 mt-9 mr-7">
    <img className="m-1 rounded-full w-7 h-7" src={user.image} alt="user" />
    <p className="text-white text-x p-1 font-thin">{user.name}</p> 
    </div>
  </nav>        
  );
}

export default Navbar;