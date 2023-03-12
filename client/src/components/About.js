import React, { Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Box from "./Box";

const about = () => {
   
    
    return (
        <div className="flex-col  bg-black h-screen  w-full justify-center items-center bg-gradient-to-b from-green-800 via-green-800 to-black ">
            <nav className="justify-start items-start p-9">
            <Link to="/" className=" text-xl b border-b-2 border-green-100 w-14 text-green-100 hover:text-zinc-700 hover:border-zinc-700"> Home </Link>
            </nav>
            <div className= "h-64 w-full">
                <Canvas className="canvas" style="">
                <ambientLight intensity={0.8}/>
                <directionalLight position={[-3, 5, 2]} intensity={1} />
                <OrbitControls enableZoom={false}/>
                <Suspense fallback={null}>
                    <Box />
                </Suspense>
                </Canvas>
            </div>
            <div className="b border-cyan-50 w-screen flex flex-col justify-center items-center mt-32">
                        <h1 className="text-white font-extrabold text-5xl text-center">Best way to use it</h1> <br></br>
                        <p className="text-white text-center text-2xl mt-1  p-4 font-serif ">Our advanced algorithm combines the power of OpenAI and Spotify's vast music library to create personalized playlists tailored to your mood.
                        Whether you're feeling upbeat, relaxed, or somewhere in between, our tool will curate a playlist that matches your vibe. 
                        Simply select your desired mood and let our technology do the rest. 
                        Our playlist generator is perfect for discovering new music and enhancing your listening experience. 
                        Give it a try today and let the power of AI elevate your music experience to the next level!</p>
                    </div>
        </div>
        )
    }

export default about;