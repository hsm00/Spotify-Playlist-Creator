import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from "./useAuth"
import axios from 'axios';
import './index.css';

export default function Dashboard({ code }) {
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
      redirectUri: 'http://localhost:3000/localhost:3000/dashboard'
    });

    // spotifyApi.setAccessToken(token);

    useEffect(() => {
        const fetchData = async () => {
          await spotifyApi.setAccessToken(token);
          if (!token) return;
          try {
            const data = await spotifyApi.getMe();
            setUser({
              name: data.body.display_name,
              email: data.body.email,
              followers: data.body.followers.total,
              country: data.body.country,
              image: data.body.images[0].url,
              id: data.body.id
            });
          } catch (err) {
            console.log('Something went wrong!', err);
          }
        };
    
        fetchData();
      }, [token]);
      
      
    return (
        <div>
            <h1> Hello {user.name}</h1>  
        </div>
    )
}