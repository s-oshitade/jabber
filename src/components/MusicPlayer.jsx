import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import styled from "styled-components";

function MusicPlayer({token}) {

  const [playBackUris, setPlayBackUris] = useState([]);
  useEffect ( ()=> {
    console.log('token:', token);
    if (token) {
      fetch('https://api.spotify.com/v1/me/top/tracks', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        method: 'GET'
      })
      .then((res) => {
        return res.json()
      })
      .then((topItems) => {
        setPlayBackUris(topItems.items.map((item) => item.uri))
      })
    }
    
  },[token]) 


return (
  
  <SpotifyPlayerContainer >
    <SpotifyPlayer
      uris={playBackUris}
      token={token}
      magnifySliderOnHover={true}
      persistDeviceSelection={true}
      showSaveIcon={true}
      syncExternalDevice={true}
      styles={{
        activeColor: '#fff',
        bgColor: 'none',
        color: 'rgb(185,187,190)',
        loaderColor: '#fff',
        sliderColor: '#1cb954',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
      }}  
    />
  </SpotifyPlayerContainer>
);
}

const SpotifyPlayerContainer = styled.div`
flex: 0.7;
flex-grow: 1.6;
margin-right: 6em;
margin-left: 4.8em;
/* position: relative;
width: 860px;
margin-right: 1.2em; */
`


export default MusicPlayer