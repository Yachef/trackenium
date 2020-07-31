import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
import DropdownMenu from '../DropdownMenu';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  links:{
    textDecoration:'none',
    color:'white'
  }
}

class Navigation extends Component{
  constructor(props){
    super(props)
    this.state =  {
      username:'',
      userId:null
    }
  }
  // const username = props.firebase.user
  componentDidMount(){
    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({userId:user.uid})
        this.props.firebase.user(user.uid).on('value', snapshot => {
          this.setState({username:snapshot.val().username})
        })
        // User is signed in.
      }else{
        this.setState({userId:null,username:""})
      }
    });
  }

  componentWillUnmount(){
    if(this.state.uid)
    {
      this.props.firebase.user(this.state.uid).off();
    }
  }

  render(){
    return(
      <div>
        <AuthUserContext.Consumer>
          {authUser =>
            authUser ? <NavigationAuth user ={this.state.username ? this.state.username : null}/> : <NavigationNonAuth />
          } 
        </AuthUserContext.Consumer>
      </div>
    )
  };
}
 
const NavigationAuth = ({user}) => (
  <div>
    <AppBar position="static">
        <Toolbar>
          <Link style = {{textDecoration:'none',color:'white',flexGrow:1}} to={ROUTES.HOME}>
            <Typography style = {{flexGrow:1}}variant="h6">
              Trackenium
            </Typography>           
          </Link>
          {user ? <DropdownMenu username = {user} /> : null}
        </Toolbar>
    </AppBar>
  </div>

);
 
const NavigationNonAuth = () => (
  <div>
    <AppBar position="static">
        <Toolbar>
          <Link style = {{textDecoration:'none',color:'white',flexGrow:1}} to={ROUTES.HOME}>
            <Typography style = {{flexGrow:1}}variant="h6">
              Trackenium
            </Typography>           
          </Link>
          <Link style = {styles.links} to={ROUTES.SIGN_IN}>
            <Button color="inherit">Connexion</Button>
          </Link>
          <Link style = {styles.links} to={ROUTES.SIGN_UP}>
            <Button color="inherit">Inscription</Button>
          </Link>
        </Toolbar>
      </AppBar>
  </div>
);
 
export default withFirebase(Navigation);