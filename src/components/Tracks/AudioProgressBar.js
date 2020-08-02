import React from 'react';


const AudioProgressBar = ({mediaURL}) => {
    return ( 
    <audio
    controls
    style = {{height:'35px'}}
    src={mediaURL}>
        Your browser does not support the
        <code>audio</code> element.
    </audio>
     );
}
 
export default AudioProgressBar;