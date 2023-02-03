const jwt = require('jsonwebtoken');
require("dotenv").config()
const SpotifyWebApi = require('spotify-web-api-node')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.json())

// /login
exports.getAccessToken = (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    });
    spotifyApi.authorizationCodeGrant(code).then((data) => {
        const payload = {
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        };
        const secret = process.env.JWT_SECRET;
        const options = {
            expiresIn: '3600s',
        };
        const token = jwt.sign(payload, secret, options);
        res.json({ token });
        console.log(token);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
};

// /refresh
exports.getRefreshToken = (req, res) => {
    const refreshRefreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: refreshRefreshToken,
    });
    spotifyApi.refreshAccessToken().then((data) => {
        const payload = {
            accessToken: data.body.access_token,
        };
        const secret = process.env.JWT_SECRET;
        const options = {
            expiresIn: '3600s',
        };
        const token = jwt.sign(payload, secret, options);
        res.json({ token });
    }).catch((err) => {
        console.log(err);
        res.sendStatus(400);
    });
};