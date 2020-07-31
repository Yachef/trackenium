import React from 'react';
 
import { withFirebase } from '../Firebase';
 
const SignOutButton = ({ firebase }) => (
  <a  href = '#'style = {{cursor:"pointer", textDecoration:"none",color:"white"}} type="button" onClick={firebase.doSignOut}>
    Déconnexion
  </a>
);
 
export default withFirebase(SignOutButton);