import React, {Component} from 'react';
import { withFirebase } from '../Firebase';
import CondensedTrack from './CondensedTrack';
import { Paper, Typography, Container } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

class LikedTracks extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            filteredTracks:null,
            loading:true
         }
        this.tracksRef = this.props.firebase.tracks()
    }
    componentDidMount(){
        const trackIds = []
        const trackValues = []
        this.tracksRef.on('value',snapshot =>{
            const tracks = snapshot.val()
            Object.keys(tracks).forEach((track) => {
                if(tracks[track].likes){
                    if(tracks[track].likes.includes(this.props.authUser.uid)){
                        trackIds.push(track)
                        trackValues.push(tracks[track])
                    }
                }
            })
            this.setState({
                filteredTracks:[trackIds, trackValues],
                loading:false
            })
        })
    }
    componentWillUnmount(){
        this.tracksRef.off()
    }
    showTrackList = () => {
        const tracksArray = this.state.filteredTracks[1]
        const tracksKeys = this.state.filteredTracks[0]
        const trackList = tracksArray.map((track, index) =>
          <CondensedTrack 
          key = {index}
          trackId = {tracksKeys[index]}
          likesCount = {track.likes ? track.likes.length:0}
          title = {track.name} 
          author = {track.author}
          mediaURL = {track.url}/>
        );
        return (
          <div id = 'tracklist'>
            {trackList}
          </div>
        );
      }
    render() { 
        return ( 
            <Paper style = {{marginTop:'20px',padding:'15px 5px'}}>
                <Container>
                    <div style = {{display:'flex', alignItems:'center',marginBottom:"15px"}}>
                        <ThumbUpAltIcon color = "secondary" style ={{marginRight:"10px"}}/> 
                        <Typography variant = 'h5'>
                         Pistes aimées
                        </Typography>
                    </div>
                    {this.state.filteredTracks ? this.showTrackList():null}
                </Container>
            </Paper>
         );
    }
}
 
export default withFirebase(LikedTracks);