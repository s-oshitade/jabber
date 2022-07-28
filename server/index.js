const express = require('express');
const dotenv = require('dotenv')

const port = 5001;

//Loads .env file contents into process.env.
dotenv.config();

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET

// const spotify_redirect_uri = 'http://localhost:3000/auth/callback'

const generateRandomString = function (length) {
  const text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (const i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const app = express();

//request user authorization by getting an Authorization Code.
//redirect the user to a web page where they can choose to grant our application access to their premium account
// app.get('/auth/login', (req, res) => {

//   // allow permission for streaming, user-read-email and user-read-private
//   const scope = "streaming user-read-email user-read-private"
//   const state = generateRandomString(16); // //randomly generated string to protect against attacks such as cross-site request forgery.

//   var auth_query_parameters = new URLSearchParams({
//     response_type: "code",
//     client_id: spotify_client_id,
//     scope: scope,
//     redirect_uri: spotify_redirect_uri,
//     state: state
//   })

//   /** 
//    * Once the user approves the application request, the user is redirected back to the application using the redirect_uri
//    *  The callback contains two query parameters:
//    *  1. An authorization code that will be exchanged for an access token.
//    *  2. The same state supplied in the request.
//   */ 
//   res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());

// });



// // request the Access Token using the Authorization Code requested in the previous step.
// app.get('auth/callback', (req, res) => {
//   const code = req.query.code;

//   const authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     form: {
//       code: code, //authorization code returned on the previous step
//       redirect_uri: spotify_redirect_uri,
//       grant_type: 'authorization_code'
//     },
//     headers: {
//       'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
//       'Content-Type' : 'application/x-www-form-urlencoded'
//     },
//     json: true
//   };

  
// })

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})