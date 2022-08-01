import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';


function MusicPlayer({token}) {


return (
  <SpotifyPlayer
  uris={["spotify:artist:3TVXtAsR1Inumwj472S9r4"]}
  token={token}
  persistDeviceSelection={true}
  showSaveIcon={true}
  syncExternalDevice={true}
  styles={{
    activeColor: '#fff',
    bgColor: 'none',
    color: '#fff',
    loaderColor: '#fff',
    sliderColor: '#1cb954',
    trackArtistColor: '#ccc',
    trackNameColor: '#fff',
  }}
/>
);
    
  }

export default MusicPlayer