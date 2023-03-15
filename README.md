# Spotify Playlist Generator


The Spotify Playlist Generator is an web-application written in react and express.js that allows you to generate a playlist based on your mood, favorite genre, and artist using the Spotify API and the OpenAI API.

## How to get access:
  URL = https://aiplaylist.netlify.app
  
  Since the application is in development mode by on the Spotify side, I have to activate each user before they get to use it. 
  Please send me a Email or message me on Discord and tell me your spotify email address so I can activate you.
    Discord: Hesam49er#7638

## How it Works
- The user is asked to input their mood, favorite genre, and artist.
- The application uses the OpenAI API to generate a playlist based on the user's input.
- The application displays a preview of the upcoming playlist, and the user can choose to regenerate the playlist or accept it.
- The Spotify API is used to search for tracks with the artist name and song name it gets from OpenAI API.
- If the user accepts the playlist, the application creates a new playlist in the user's Spotify account.

![Screenshot from 2023-03-13 10-57-32](https://user-images.githubusercontent.com/106731623/225255871-22da18ed-cd50-4d03-919e-b15dcfc41a3f.png)

![Screenshot from 2023-03-15 09-48-20](https://user-images.githubusercontent.com/106731623/225255938-485c1e4f-6f51-49a1-963d-e2954b3d2b08.png)


### Installation
- clone repository
- go to /client
- run `npm install`
- run `npm start`
- the frontend is now ready on `[localhost](http://localhost:3000/)`

- now go to /server
- run `npm install`
- run `npm start`
- the backend is now running on `[localhost](http://localhost:3001/)`
