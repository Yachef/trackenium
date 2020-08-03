import React from 'react';
import { Typography } from '@material-ui/core';
import AudioProgressBar from '../Tracks/AudioProgressBar';

const CondensedTrack = ({title, author, likesCount, mediaURL, trackId }) => {
    return ( 
        <div style = {{marginBottom:'15px'}}>
            <Typography variant = 'subtitle2'>
                {`${title} - ${author} - ${likesCount} Mention(s) J'aime`}
            </Typography>
            <div>
                <AudioProgressBar mediaURL = {mediaURL}/>
            </div>
        </div>
     );
}
 
export default CondensedTrack;