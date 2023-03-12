import Navbar from './components/Nav';
import Sidebar from './components/Sidebar';
import Main from './components/Main';

import { useState, useEffect } from 'react';

import useAuth from "./useAuth"
import './index.css';

import { useLocation } from 'react-router-dom';



export default function Dashboard({ code }) {
    const token = useAuth(code);
    const [user, setUser] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState();
    const [selectedPlaylistTracks, setSelectedPlaylistTracks] = useState([]);

    const location = useLocation();
  
    var SpotifyWebApi = require('spotify-web-api-node');
    // credentials are optional
    let spotifyApi = new SpotifyWebApi({
      clientId: '58cb403bae2240ff8af16de248d5020c',
      clientSecret: '569501fa826b4bd499753ff7b6325493',
      redirectUri: 'https://thriving-knee-production-03ff.up.railway.app/dashboard'
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
      
        const fetchPlaylists = async (offset) => {
          await spotifyApi.setAccessToken(token);
          if (!token) return;
          try { 
          spotifyApi.getUserPlaylists({ limit: 50, offset })
            .then(data => {
              setPlaylists(prevPlaylists => [...prevPlaylists, ...data.body.items]);
              console.log(data)
              if (data.body.next) {
                fetchPlaylists(offset + 50);
                console.log(data.body.next);
              }
            })
          } catch (err) {
            console.log('Something went wrong!', err);
          }
     
          
        };
      
        fetchPlaylists(0);
      }, [token]);

    useEffect(() => {
      const id = location.pathname.split('/')[2];
      const selectedPlaylist = playlists.find(playlist => playlist.id === id);
      if (selectedPlaylist) {
        setSelectedPlaylist(selectedPlaylist);
      }
    }, [location, playlists]);

    useEffect(() => {
      if (!selectedPlaylist) return;
      spotifyApi.getPlaylistTracks(selectedPlaylist.id)
        .then(data => {
          setSelectedPlaylistTracks(data.body.items.map(track => {
            const smallestAlbumImage = track.track.album.images.reduce(
              (smallest, image) => {
                if (image.height < smallest.height) return image; 
                return smallest;
              },
              track.track.album.images[0]
            );

            return {
              artist: track.track.artists[0].name,
              title: track.track.name,
              uri: track.track.uri,
              albumUrl: smallestAlbumImage.url
            };
          }));
        })
        .catch(error => {
          console.log('Something went wrong!', error);
        });
    }, [selectedPlaylist]);
      
    return (
      token &&
        <div className='flex flex-col bg-gradient-to-b from-green-800 via-green-800 to-black w-screen h-screen'>
            <Navbar user={user}/>
            <Sidebar playlists={playlists}/>  
             {selectedPlaylist ? 
              <div className="flex  h-screen  flex-col items-center mx-6 ">
              <img src={selectedPlaylist?.images[0]?.url || '2'} alt="" className="h-96 w-96 mt-10" />
              <div className=" h-screen w-84 mb-9 mx-3 items-center justify-center">
                <ul className="text-white mt-6 h-screen w-full ">
              {selectedPlaylistTracks.map(track => (
                <li className="mt-4 mb-6 w-full" key={track.uri}>
                  <div className="flex flex-col rounded-lg bg-slate-900 p-4 h-24 w-full">
                    <div>{track.title}</div>
                    <div className="text-sm text-gray-400 mt-1">{track.artist}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
            </div>
              : <Main token= {token}/>}
              
        </div>
    )
}