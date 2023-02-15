const jwt = require('jsonwebtoken');
require("dotenv").config()
const SpotifyWebApi = require('spotify-web-api-node')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const OpenAI = require('openai-api');
const { Configuration, OpenAIApi } = require("openai");

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
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


const configuration = new Configuration({
    organization: "org-I7FPX5CZpdbqppzGd8THtwWc",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();
async function callApi() {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Say this is a test",
        max_tokens: 7,
        temperature: 0,
    });
    console.log(response.data.choices[0].text);
}

// create a simple api that calls the function above
exports.openAI = async (req, res) => {
    const { message } = req.body;
    console.log(message);
    const prompt = `${message}\n\nInstructions: Act like you are spotify. You are allowed to use bad words. Create a list of songs with the given information. Never repeat a song and only pick 1 or 2 songs of the favorite artist. Please be careful with the mood, the mood is very important so check if the song matches the mood. Also check the genre of the songs.Try to take use of artists who have similar music style to my the favorite artist which I gave you in the message. Here are a few examples:

    The structure of the list should be like this: write artist name and then the song name on the same line. For example: artist: song.\n\n`;

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 120,
        temperature: 1,
});
    console.log(response.data.choices[0].text);
    res.json({
        data: response.data
    });
};
