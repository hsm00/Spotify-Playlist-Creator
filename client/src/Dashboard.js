import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from "./useAuth"
import axios from 'axios';
import './index.css';

export default function Dashboard({ code }) {//check if there is an access token in local storage and if so, use it else use the access token from the useAuth hook 
    const accessToken = useAuth(code);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [lyrics, setLyrics] = useState("");
    var SpotifyWebApi = require('spotify-web-api-node');
    // credentials are optional
    let spotifyApi = new SpotifyWebApi({
      clientId: '58cb403bae2240ff8af16de248d5020c',
      clientSecret: '569501fa826b4bd499753ff7b6325493',
      redirectUri: 'http://localhost:3000'
    });

    spotifyApi.setAccessToken(accessToken)

    

    useEffect(() => {
        if (!accessToken) {
        spotifyApi.setAccessToken(accessToken);
        }
        spotifyApi.getMe()
        .then((data) => {
            console.log('Some information about the authenticated user', data.body);
        })
        .catch((err) => {
            console.log('Something went wrong!', err);
        });
    }, []);

    return (
        <div>
<<<<<<< Updated upstream
            <h1>Dashboard</h1>
=======
            <h1> Hello {user.name}</h1>
            
>>>>>>> Stashed changes
        </div>
    )
}