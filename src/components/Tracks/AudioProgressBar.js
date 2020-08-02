import React from 'react';
import soundfile from './media/t-rex-roar.mp3'


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