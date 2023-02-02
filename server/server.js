require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
// const lyricsFinder = require("lyrics-finder")
const SpotifyWebApi = require("spotify-web-api-node")

const app = express()
app.use(cors())
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

const apiToken = require("./routes/apiToken/apiToken")

app.use(apiToken);



app.listen(3001);
