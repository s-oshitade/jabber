
import React from 'react';


function SpotifyLogin() {
    return (
          <a className="btn-spotify" href={`${process.env.REACT_APP_EXPRESS_URL}/auth/login`} >
            
          </a>

        
    );
}

export default SpotifyLogin;