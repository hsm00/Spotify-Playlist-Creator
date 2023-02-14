import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../index.css';

const Main = ({playlists}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [input , setInput] = useState();
    const [chatLog, setChatLog] = useState([]);

    const [playlistName, setPlaylistName] = useState("");
    const [mood, setMood] = useState("");
    const [genre, setGenre] = useState("");
    const [favoriteArtist, setFavoriteArtist] = useState("");
    const [leastFavoriteArtist, setLeastFavoriteArtist] = useState("");
    const [numSongs, setNumSongs] = useState("");
    const [numSongsFromFavoriteArtist, setNumSongsFromFavoriteArtist] = useState("");
    const [numSongsFromLeastFavoriteArtist, setNumSongsFromLeastFavoriteArtist] = useState("");
    const [numSongsFromFavoriteGenre, setNumSongsFromFavoriteGenre] = useState("");
    const [numSongsFromLeastFavoriteGenre, setNumSongsFromLeastFavoriteGenre] = useState("");

    async function handleSubmit (e)  {
        e.preventDefault();
       await setChatLog([{user: "me", message: `create a playlist with the songs available on spotify with the following data: mood= ${mood} genre= ${genre} favorite artist= ${favoriteArtist} with 5 songs`}])
       
        setInput("");

       // fetch the chatlog and post it to 3001/api
        const response = await fetch('http://localhost:3001/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              message : chatLog.map((message) => message.message).join("")
            })
          });
          const data = await response.json();
        console.log(data);
      };

    return (
        <div className="flex items-center justify-center h-screen w-screen bg-white-500">
        <form onSubmit={handleSubmit} 
        rows="1"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="bg-white-500 px-64 rounded-lg shadow-xl">
          <h1 className="font-bold mt-10 text-white">Generate your playlist</h1>
          <div className="mt-20">
            <label htmlFor="playlist-name" className="block text-white font-medium">Playlist name: </label>
            <input
              type="text"
              id="playlist-name"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              required
              className="w-full border border-gray-800 rounded p-2 mt-2 text-black"
            />
          </div>
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
          </div>
    );
};

export default Main;