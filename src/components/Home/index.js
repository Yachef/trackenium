import React, { Component } from 'react';
 
import { withAuthorization } from '../Session';

import SearchBar from './Search/SearchBar'
import SingleTrack from '../Tracks/SingleTrack';

import { Container, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import AddTrackDialog from './Search/AddTrackDialog';


Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )  // eslint-disable-next-line
          .reduce( (res, key) => (res[key] = obj[key], res), {} );
 
class HomePage extends Component {

  constructor(props){
    super(props)
    this.state = {
      searchQuery:'',
      tracks:null,
      displayedTracks:null,
      openDialog:false
    }
  }
  componentWillMount(){
    this.props.firebase.tracks().on('value',(snapshot) =>{
      this.setState({
        tracks:snapshot.val(),
        displayedTracks:snapshot.val()
      })
    })
  }

  showTrackList = () => {
    const tracksArray = Object.values(this.state.displayedTracks)
    const tracksKeys = Object.keys(this.state.displayedTracks)
    const trackList = tracksArray.map((track, index) =>
      <SingleTrack 
      key = {index}
      trackId = {tracksKeys[index]}
      likesCount = {track.likes ? track.likes.length:0}
      liked = {track.likes ? track.likes.includes(this.props.authUser.uid):false}
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
    let {authUser, firebase} = this.props
    let newLikes = this.state.tracks[trackId].likes;
    if(newLikes){
      if(newLikes.includes(authUser.uid)){
        newLikes = newLikes.filter(like => like !== authUser.uid);
      }else{
        newLikes.push(authUser.uid)
      }
      firebase.tracks().child(trackId).update({likes:newLikes});
    }else{
      newLikes = {
        likes:[authUser.uid]
      }
      firebase.tracks().child(trackId).update(newLikes);
    }

  }

  filterDisplayedTracks = (searchQuery) => {
    var filteredTracks = Object.filter(this.state.tracks,track => {
      track.name.includes("Devil")
      const author = track.author.toLowerCase()
      const title = track.name.toLowerCase()
      return title.includes(searchQuery) || author.includes(searchQuery)
    })
    this.setState({displayedTracks:filteredTracks})
  }

  componentWillUnmount(){
    this.props.firebase.tracks().off()
  }

  render(){
    return(
      <div>
      <Container style = {{marginTop:'40px'}}>
        <SearchBar changeSearchQuery = {this.filterDisplayedTracks} />
        {this.state.tracks ? this.showTrackList() : null}
      </Container>
      <div style = {{position:'fixed',right:'35px',bottom:'35px'}}>
        <Fab color="primary" aria-label="add" onClick = {() => this.setState({openDialog:true})}>
          <AddIcon />
        </Fab>
      </div>
      <AddTrackDialog open = {this.state.openDialog} closeDialog = {() => this.setState({openDialog:false})}/>
    </div>
    )
  }
}

const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(HomePage);

  // writeUserData = () => {
  //   this.props.firebase.tracks().push({
  //     name:"Nemir",
  //     author: "A. Himitsu",
  //     url:'https://firebasestorage.googleapis.com/v0/b/trackenium.appspot.com/o/adventures.mp3?alt=media&token=1c7709e7-c73e-4ac5-a611-d0666d7fcf10',
  //     likes:['9PcloU0Gx8abE1pjtjrfoINssbm1','CK5uKfOGaMefnxLRwghIfJAuhbP2']
  //   })
  // }
