import React from 'react';

import { Paper, IconButton,Typography } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

import AudioProgressBar from './AudioProgressBar';

const SingleTrack = ({title, likesCount, author, mediaURL, liked, likeClicked, trackId }) => {
    const colored = liked ? 'secondary' : 'inherit' 
    return ( 
        <div className = 'centered' style ={{margin:'30px'}}>
            <Paper style ={{padding:'20px 40px',width:'800px'}}>
                <div className = 'centered'>
                    <div style = {{width:'50%',justifyContent:'flex-start'}} className = 'centered'>
                        <div className = 'centered'>
                            <Typography variant='subtitle2' color={colored}>{likesCount}</Typography>
                            <IconButton onClick = {()=>likeClicked(trackId)}>
                                <ThumbUpAltIcon color  = {colored} />
                            </IconButton> 
                        </div>
                        <div>
                            <Typography variant='subtitle2' color='primary'>{title}</Typography>
                            <Typography variant = 'caption'>{author}</Typography>
                        </div>
                    </div>
                    <div style= {{width:'50%',minWidth:'300px', display:'flex',justifyContent:'flex-end'}}>
                        <AudioProgressBar mediaURL = {mediaURL}/>
                    </div>
                </div>
            </Paper>
        </div>

     );
}
 
export default SingleTrack;