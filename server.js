//set up a server on port 3000 using express.js
const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const { json, response } = require('express');
const app = express();
const router = express.Router();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000/callback',
        clientId: '58cb403bae2240ff8af16de248d5020c',
        clientSecret: '569501fa826b4bd499753ff7b6325493'
    });

    const getMe = () => {
        spotifyApi.getMe()
      .then(function(data) {
        //put the data in a json format
        const dataJson = JSON.stringify(data.body);
        console.log('Some information about the authenticated user', dataJson);
      }, function(err) { 
        console.log('Something went wrong!', err);
      });
    };

router.get('/', (req, res, next) => { 
    res.redirect(spotifyApi.createAuthorizeURL([
        'user-read-email',
        'user-read-private',
        'ugc-image-upload',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-read-currently-playing',
        'streaming',
        'app-remote-control',
        'user-read-recently-played',
        'user-top-read',
        'playlist-read-collaborative',
        'playlist-modify-public',
        'playlist-read-private',
        'playlist-modify-private',
        'user-library-modify',
        'user-library-read',
        'user-follow-modify',
        'user-follow-read',
        'user-read-playback-position',
        ]));
});

router.get('/home', async (req, res, next) => {
     try {
     //get access token from cookie
        const accessToken = req.cookies.access_token;
        //set access token on the API object to use it in later calls
        spotifyApi.setAccessToken(accessToken);
        // get user data
        const response = await spotifyApi.getMe();
        const data = response.body;
        //say hello to the user
        res.send(`Hello ${data.display_name}!`);
        //

        // res.send(data.display_name);
         
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

router.get('/callback', async (req, res, next) => {
    const code = req.query.code;
    console.log('code', code);
    try {
        const response = await spotifyApi.authorizationCodeGrant(code);
        res.cookie('access_token', response.body['access_token'], { maxAge: 900000, httpOnly: true });
        res.redirect('/home');
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
});

app.use('/', router);
app.listen(3000);