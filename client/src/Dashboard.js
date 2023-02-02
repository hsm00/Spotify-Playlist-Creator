import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from "./useAuth"
import axios from 'axios';

export default function Dashboard({ code }) {//check if there is an access token in local storage and if so, use it else use the access token from the useAuth hook 
    const token = useAuth(code);
    const [user, setUser] = useState([]);
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

    spotifyApi.setAccessToken(token);

    

    useEffect(() => {
        if (!token) {
        spotifyApi.setAccessToken(token);
        }
        spotifyApi.getMe()
        .then((data) => {
            setUser({
                name: data.body.display_name,
                email: data.body.email,
                followers: data.body.followers.total,
                country: data.body.country,
                image: data.body.images[0].url,
                id: data.body.id
            });
        })
        .catch((err) => {
            console.log('Something went wrong!', err);
        });
    }, [token]);

    return (
        <div>
            <h1>Dashboard</h1>
            <ul> 
               <li> {user.name} </li>  
            </ul>
        </div>
    )
}