import SpotifyLogo from '../../images/icons8-spotify.svg';
import React from 'react';
import '../../index.css';
const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=58cb403bae2240ff8af16de248d5020c&response_type=code&redirect_uri=http://localhost:3000/dashboard&response_type=token&scope=user-read-private%20user-read-email%20playlist-modify-public%20playlist-modify-private%20playlist-read-private%20playlist-read-collaborative%20user-library-read%20user-library-modify%20user-top-read%20user-read-recently-played%20user-follow-read%20user-follow-modify';

const Button = ({url}) => (
    <button 
    className="my-auto bg-green-100 border-2  border-black rounded-full p-4 text-black font-bold inline-flex hover:bg-green-600"
    onClick={() => { window.location.href = url; }}
    >
        <img src={SpotifyLogo} alt="Spotify Logo" className="mr-2" />
        LOGIN WITH SPOTIFY
    </button>
  
);
export default Button;
