import React from "react";

// function generateRandomString(length) {
//   var text = "";
//   var possible =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//   for (var i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// }

// var state = generateRandomString(16);

const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=58cb403bae2240ff8af16de248d5020c&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-private%20user-read-email%20playlist-modify-public%20playlist-modify-private%20playlist-read-private%20playlist-read-collaborative%20user-library-read%20user-library-modify%20user-top-read%20user-read-recently-played%20user-follow-read%20user-follow-modify';

export default function Login() {
    return (
        <div>
        <a href={AUTH_URL}>LOGIN WITH SPOTIFY</a>
        </div>
    )
}