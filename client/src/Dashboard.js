import Navbar from './components/Nav';
import Sidebar from './components/Sidebar';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from "./useAuth"
import axios from 'axios';
import './index.css';
import { useLocation } from 'react-router-dom';



export default function Dashboard({ code }) {
    const token = useAuth(code);
    const [user, setUser] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState();
    const location = useLocation();
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

    spotifyApi.setAccessToken(token);

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


    useEffect(() => {
        if (!token) return;
        spotifyApi.getUserPlaylists().then( 
          function(data) {
            console.log('Retrieved playlists', data.body);
            setPlaylists(data.body.items);
          },
          function(err) {
            console.log('Something went wrong!', err);
          }
        );
    }, []);

    useEffect(() => {
      const id = location.pathname.split('/')[2];
      const selectedPlaylist = playlists.find(playlist => playlist.id === id);
      if (selectedPlaylist) {
        setSelectedPlaylist(selectedPlaylist);
      }
    }, [location, playlists]);
      
    return (
        <div className='flex bg-gradient-to-b from-green-900 via-black to-black h-screen'>
            <Navbar user={user}/>
            <Sidebar playlists={playlists}/>  
            <div>
              <img src={selectedPlaylist?.images[0]?.url || '2'} alt="" className="h-96 w-96" />
            </div>


        </div>
    )
}