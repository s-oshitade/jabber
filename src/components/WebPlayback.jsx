import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';


function WebPlayback({token}) {
console.log(token);
return (
  <SpotifyPlayer
  token={token}
/>
);
    
  }

export default WebPlayback