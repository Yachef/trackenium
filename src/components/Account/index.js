import React from 'react';
 
import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { Typography, Grid } from '@material-ui/core';
 
const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <Grid container spacing={3} style = {{marginTop:"40px"}}>
          <Grid item lg={6} style = {{width:'100%'}}>
            <div className = 'centered'>
              <PasswordForgetForm />
            </div>
          </Grid>
          <Grid item lg={6} style = {{width:'100%'}}>
            <div className = 'centered'>
            <PasswordChangeForm />
            </div>
          </Grid>
        </Grid>
      </div>
    )}
  </AuthUserContext.Consumer>
);
 
const condition = authUser => !!authUser;
 
export default withAuthorization(condition)(AccountPage);