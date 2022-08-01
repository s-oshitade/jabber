const express = require('express');
const request = require('request')
const dotenv = require('dotenv')
const morgan = require('morgan');
const fetch = require('node-fetch');

const port = 5001;

global.access_token = ''

//Loads .env file contents into process.env.
dotenv.config();

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET

const spotify_redirect_uri = 'http://localhost:3000/auth/callback'

const generateRandomString = function (length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const app = express();
app.use(morgan("dev"));
//request user authorization by getting an Authorization Code.
//redirect the user to a web page where they can choose to grant our application access to their premium account
app.get('/auth/login', (req, res) => {

  // allow permission for streaming, user-read-email and user-read-private
  const scope = "streaming user-read-email user-read-private user-read-playback-state user-library-read user-library-modify user-top-read"
  const state = generateRandomString(16); // //randomly generated string to protect against attacks such as cross-site request forgery.

  const auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state
  })

  /** 
   * Once the user approves the application request, the user is redirected back to the application using the redirect_uri
   *  The callback contains two query parameters:
   *  1. An authorization code that will be exchanged for an access token.
   *  2. The same state supplied in the request.
  */ 
  res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());

});



// request the Access Token using the Authorization Code requested in the previous step.
app.get('/auth/callback', (req, res) => {
  const code = req.query.code;

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code, //authorization code returned on the previous step
      redirect_uri: spotify_redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
      'Content-Type' : 'application/x-www-form-urlencoded'
    },
    json: true
  };

  //Now that we have the authorization code, we must exchange it for tokens. Using the code from the previous step,
  //we need to make a POST request to the /api/token endpoint.
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
      res.redirect('/')
    }
  });

  
})

//This access token will be used to instantiate the Web Playback SDK.
app.get('/auth/token', (req, res) => {
  res.json({ access_token: access_token})
})


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})