import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';


function MusicPlayer({token}) {
console.log(token);
return (
  <SpotifyPlayer
  token={token}
/>
);
    
  }

export default MusicPlayer