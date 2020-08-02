import React from 'react';

import * as ROUTES from '../../constants/routes'

import { withFirebase } from '../Firebase';

import { Link } from 'react-router-dom';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MenuItem, Button, Menu } from '@material-ui/core';
 
const DropdownMenu = ({ firebase, username }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return(
    <div>
        <Button style = {{color:'white'}}aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <div className = "centered" >
          <p>{username }</p>
          <ExpandMoreIcon style = {{marginLeft:"5px"}} />
          </div>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick = {handleClose  }><Link to={ROUTES.ACCOUNT} style={{ textDecoration: 'none', color:"black" }}>Mon Compte</Link></MenuItem>
          <MenuItem onClick = {firebase.doSignOut}>Déconnexion <ExitToAppIcon style = {{marginLeft:"5px"}}/></MenuItem>
        </Menu>
    </div>
  )
};


 
export default withFirebase(DropdownMenu);