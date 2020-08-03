import React, {Component} from 'react';
import { withFirebase } from '../Firebase';
import CondensedTrack from './CondensedTrack';
import { Paper, Typography, Container } from '@material-ui/core';
import MusicNoteIcon from '@material-ui/icons/MusicNote';

class CreatedTracks extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            filteredTracks:null,
            loading:true
         }
         this.filteredTracksRef = this.props.firebase.tracks().orderByChild('createdBy').equalTo(this.props.authUser.uid)
    }
    componentDidMount(){
        this.filteredTracksRef.on('value',snapshot =>{
            this.setState({
                filteredTracks:snapshot.val(),
                loading:false
            })
        })
    }
    componentWillUnmount(){
        this.filteredTracksRef.off()
    }
    showTrackList = () => {
        const tracksArray = Object.values(this.state.filteredTracks)
        const tracksKeys = Object.keys(this.state.filteredTracks)
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
                        <MusicNoteIcon style ={{color:'lightgreen', marginRight:'10px'}} />
                        <Typography variant = 'h5'>
                        Pistes ajoutées
                        </Typography>
                    </div>
                    {this.state.filteredTracks ? this.showTrackList():null}
                </Container>
            </Paper>
         );
    }
}
 
export default withFirebase(CreatedTracks);