import React from 'react';
import { Link } from 'react-router-dom';
 
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  links:{
    textDecoration:'none',
    color:'white'
  }
}

const Navigation = (props) => {
  const username = props.firebase.user
  console.log(username)
  return(
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
)};
 
const NavigationAuth = () => (
  <div>
    <AppBar position="static">
        <Toolbar>
        {/* <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
        </IconButton> */}
          <Link style = {{textDecoration:'none',color:'white',flexGrow:1}} to={ROUTES.LANDING}>
            <Typography style = {{flexGrow:1}}variant="h6">
              Trackenium
            </Typography>           
          </Link>
          <SignOutButton />
        </Toolbar>
    </AppBar>
      <ul>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
  </div>

);
 
const NavigationNonAuth = () => (
  <div>
    <AppBar position="static">
        <Toolbar>
          <Link style = {{textDecoration:'none',color:'white',flexGrow:1}} to={ROUTES.LANDING}>
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