import React, { Component } from 'react';
 
import { withAuthorization } from '../Session';
import UserTopbar from './UserInfo';
import CreatedTracks from './CreatedTracks';
import LikedTracks from './LikedTracks';
import { Container } from '@material-ui/core';
 
class AdminPage extends Component {
  constructor(props) {
    super(props);
  }
    componentWillUnmount() {
    this.props.firebase.user().off();
  }

 
  render() {
     const {authUser} = this.props
    return (
      <div style ={{margin:'-10px'}}>
        <UserTopbar authUser = {authUser}/>
        <Container>
          <CreatedTracks authUser = {authUser} />
          <LikedTracks authUser = {authUser} />
        </Container>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AdminPage);