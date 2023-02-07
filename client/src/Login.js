import React from "react";
import './index.css';
import LoginButton from './components/buttons/spotifyLogin.js';
const BackgroundImage = '../public/spotifylogo.png';

const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=58cb403bae2240ff8af16de248d5020c&response_type=code&redirect_uri=http://localhost:3000/dashboard&response_type=token&scope=user-read-private%20user-read-email%20playlist-modify-public%20playlist-modify-private%20playlist-read-private%20playlist-read-collaborative%20user-library-read%20user-library-modify%20user-top-read%20user-read-recently-played%20user-follow-read%20user-follow-modify';

export default function Login() {
    return (
        <div className="flex justify-center bg-black h-screen w-screen">
           <LoginButton url={AUTH_URL}/>
        </div>
    )
}