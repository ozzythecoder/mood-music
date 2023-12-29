const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

console.log('in server')
const app = express();

// Enable CORS for all routes
app.use(cors());

// const sessionMiddleware = require('./modules/session-middleware');
// const passport = require('./strategies/user.strategy');

// Route includes
const songsRouter = require('./routes/songs.router');
const moodsRouter = require('./routes/moods.router');
const playlistRouter = require('./routes/playlist.router')
const spotifyRouter = require('./routes/spotify.router');


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
// app.use(sessionMiddleware);

// start up passport sessions
// app.use(passport.initialize());
// app.use(passport.session());

/* Routes */
app.use('/api/songs', songsRouter);
app.use('/api/moods', moodsRouter);
app.use('/api/playlist', playlistRouter);
app.use('/api/spotify', spotifyRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 3000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
