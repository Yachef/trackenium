import React, { Component } from 'react';
 
import { withAuthorization } from '../Session';

import SearchBar from './Search/SearchBar'
import SingleTrack from '../Tracks/SingleTrack';

import { Container } from '@material-ui/core'
 
class HomePage extends Component {

  constructor(props){
    super(props)
    this.state = {
      tracks:null,
    }
  }
  componentWillMount(){
    this.props.firebase.tracks().on('value',(snapshot) =>{
      this.setState({tracks:snapshot.val()})
    })
  }

  showTrackList = () => {
    const tracksArray = Object.values(this.state.tracks)
    const tracksKeys = Object.keys(this.state.tracks)
    const trackList = tracksArray.map((track, index) =>
      <SingleTrack 
      key = {index}
      trackId = {tracksKeys[index]}
      likesCount = {track.likes.length}
      liked = {track.likes.includes(this.props.authUser.uid)}
      title = {track.name} 
      author = {track.author}
      likeClicked = {this.handleLikeClick}
      mediaURL = {track.url}/>
    );
    return (
      <div id = 'tracklist'>
        {trackList}
      </div>
    );
  }

  handleLikeClick = (trackId) => {
    let newLikes = this.state.tracks[trackId].likes;

    if(newLikes.includes(this.props.authUser.uid)){
      newLikes = newLikes.filter(like => like !== this.props.authUser.uid);
    }else{
      newLikes.push(this.props.authUser.uid)
    }
    return this.props.firebase.tracks().child(trackId).update({likes:newLikes});
  }

  componentWillUnmount(){
    this.props.firebase.tracks().off()
  }
  // writeUserData = () => {
  //   this.props.firebase.tracks().push({
  //     name:"Nemir",
  //     author: "A. Himitsu",
  //     url:'https://firebasestorage.googleapis.com/v0/b/trackenium.appspot.com/o/adventures.mp3?alt=media&token=1c7709e7-c73e-4ac5-a611-d0666d7fcf10',
  //     likes:['9PcloU0Gx8abE1pjtjrfoINssbm1','CK5uKfOGaMefnxLRwghIfJAuhbP2']
  //   })
  // }
  render(){
    return(
      <div>
      <Container style = {{marginTop:'40px'}}>
        <SearchBar />
        {this.state.tracks ? this.showTrackList() : null}
      </Container>
    </div>
    )
  }
}


 
const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(HomePage);
