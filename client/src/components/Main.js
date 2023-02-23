import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBucket, faPlus} from '@fortawesome/free-solid-svg-icons';
import { Link, redirect, useNavigate } from 'react-router-dom';
import '../index.css';
import { useLocation } from 'react-router-dom';

const Main = ({token}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [input , setInput] = useState();
    const [chatLog, setChatLog] = useState([]);
    const location = useLocation();

    const [songsToCheck, setSongsToCheck] = useState([]);
    const [openAiSongs, setOpenAiSongs] = useState([]);
    const [spotifySongs, setSpotifySongs] = useState([]);

    const [updatePlaylist, setUpdatePlaylist] = useState("");
    const [playlistName, setPlaylistName] = useState("");
    const [playlistId, setPlaylistId] = useState("");
    const [mood, setMood] = useState("");
    const [genre, setGenre] = useState("");
    const [favoriteArtist, setFavoriteArtist] = useState("");

    const navigate = useNavigate();

    var SpotifyWebApi = require('spotify-web-api-node');

    let spotifyApi = new SpotifyWebApi({
      clientId: '58cb403bae2240ff8af16de248d5020c',
      clientSecret: '569501fa826b4bd499753ff7b6325493',
      redirectUri: 'http://localhost:3000/localhost:3000/dashboard'
    });

    spotifyApi.setAccessToken(token);


    async function handleSubmit(e) {
      e.preventDefault();
      const message = `create a playlist with songs that match the following: mood= ${mood} genre= ${genre} favorite artist: ${favoriteArtist} with 10 songs`;
      setChatLog((prevChatLog) => [...prevChatLog, { user: "me", message: message }]);
      setInput("");
      
      // change url to /dashboard/acceptstate
      navigate(`/dashboard/acceptstate`);

      const response = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        }),
      });
      


      const data = await response.json();
      setSongsToCheck(data);
      console.log(openAiSongs);
    };
    
    async function handleAcceptState(e) {
      e.preventDefault();
      setOpenAiSongs(songsToCheck);

      // set timeout to 5 seconds
      setTimeout(() => {

      window.location.href = `http://localhost:3000/dashboard/${playlistId}`;
      
      }, 5000);

      
    }
      async function createPlaylist(e) {
        e.preventDefault();
        try {
          if (!token) {
            //refresh the page
            window.location.reload();
          }
          
          const data = await spotifyApi.createPlaylist(updatePlaylist, { 'description': 'My description', 'public': true });
          console.log('Created playlist!');
          const playlistId = data.body.id;
          setPlaylistId(playlistId);
          setPlaylistName(data.body.name);
          }
          catch (err) {
          console.log('Something went wrong!', err);
        }
      }

      async function searchTracks(e) {
        const trackIds = [];
        for (const songObj of openAiSongs) {
          try {
            const { artist, song } = songObj;
            const response = await spotifyApi.searchTracks(`track:${song} artist:${artist}`);
            const items = response.body.tracks.items;
            if (items.length > 0) {
              const trackId = items[0].id;
              trackIds.push(trackId);
            } else {
              console.log(`id added for ${song} by ${artist}`);
            }
          } catch (err) {
            console.log(`Error searching for track: ${err}`);
          }
        }
        setSpotifySongs(trackIds);
        console.log(spotifySongs);

      }

      async function addTracksToPlaylist() {
        try {
          for (const trackId of spotifySongs) {
            const response = await spotifyApi.addTracksToPlaylist(playlistId, [`spotify:track:${trackId}`]);
            console.log(`Added track ${trackId} to playlist!`);
          }
        } catch (err) {
          console.log(`Error adding tracks to playlist: ${err}`);
        }
      }


      useEffect(() => {
        if (openAiSongs.length > 0) {
          // perform further actions here
          searchTracks();
        }
      }, [openAiSongs]);

      useEffect(() => {
        if (spotifySongs.length > 0) {
          // perform further actions here
          addTracksToPlaylist();
        }
      }, [spotifySongs]);
      

      if(songsToCheck.length > 0) {
        return (
          // <div className="flex items-center justify-center h-screen w-screen bg-white-500">
          //   <ul className="text-white">
          //     {songsToCheck.map((song) => (
          //       <li className= "mt-3" key={song.id}>{song.artist} - {song.song}</li>
          //     ))}
          //   </ul>
          //   <form onSubmit={handleAcceptState}

          //     rows="1"
          //     className="bg-white-500 px-64 rounded-lg shadow-xl">
          //     <button type="submit" className="bg-white mt-10 py-2 px-4 rounded-full text-black font-medium hover:bg-gray-900 hover:text-white">Accept</button>
          //   </form>
          // </div>

      <div className="flex flex-col h-screen w-screen mb-9 items-center justify-center ">
        <ul className="text-white mt-1 h-screen">
          {songsToCheck.map((track) => (
            <li
              className="mt-1 mb-1 border-b border-gray-500"
              key={track.uri}
            >
              <div className="flex flex-col p-3 h-22 w-full">
                <div>{track.song}</div>
                <div className="text-sm text-gray-400 mt-1">{track.artist}</div>
              </div>
            </li>
          ))}
        </ul>
        <form
          onSubmit={handleAcceptState}
          className="fixed bottom-0 left-0 w-full bg-white-500 px-64 py-1 shadow-xl"
        >
          <button
            type="submit"
            className="bg-white py-2 px-4 mb-3 rounded-full text-black font-medium hover:bg-gray-900 hover:text-white"
          >
            Accept
          </button>
        </form>
      </div>

        );
      }
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-white-500">
      {!playlistName && ( 
        <form onSubmit={createPlaylist}
          rows="1"
          className="bg-white-500 px-64 rounded-lg shadow-xl w-84">
          <div className="mt-20">
            <label htmlFor="playlistName" className=" w-full block text-white font-medium">Playlist name: </label>
            <input
              type="text"
              id="playlistName"
              onChange={(e) => setUpdatePlaylist(e.target.value)}
              required
              className="w-full border border-gray-800 rounded p-2 mt-2 text-black"
            />
          </div>
          <button type="submit" className="bg-white mt-10 py-2 px-4 rounded-full text-black font-medium hover:bg-gray-900 hover:text-white">Next</button>

        </form>
      )}
            {playlistName && ( 
            <form onSubmit={handleSubmit} 
            rows="1"
            value={input}
            >
           <h1 className="font-bold mt-10 text-white">Generate your playlist</h1>
          
          <div className="mt-20">
            <label htmlFor="mood" className="block text-white font-medium">Mood: </label>
            <input
              type="text"
              id="mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              required
              className="w-full border border-gray-800 rounded p-2 mt-2 text-black"
            />
          </div>
          <div className="mt-20">
            <label htmlFor="genre" className="block text-white font-medium">Genre: </label>
            <input
              type="text"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
              className="w-full border border-gray-800 rounded p-2 mt-2 text-black"
            />
          </div>
          <div className="mt-20">
            <label htmlFor="favorite-artist" className="block text-white font-medium">Favorite Artist: </label>
            <input
              type="text"
              id="favorite-artist"
              value={favoriteArtist}
              onChange={(e) => setFavoriteArtist(e.target.value)}
              required
              className="w-full border border-gray-800 rounded p-2 mt-2 text-black"
            />
          </div>
          <button type="submit" className="bg-white mt-10 py-2 px-4 rounded-full text-black font-medium hover:bg-gray-900 hover:text-white">Submit</button>
          </form>
          )}
        </div>            
    );
};

export default Main;