import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
 
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import FormBaseStyle from '../FormBaseStyle'
import { CircularProgress } from '@material-ui/core';
import { SignInLink } from '../SignIn';
 
const SignUpPage = () => (

  <div className = "centered"style = {{height:"100%"}}>
    <div>
      <SignUpForm />
      <SignInLink />
    </div>
  </div>
);
 
const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    loading:false
};
 
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    this.setState({loading:true})
    const { username, email, passwordOne } = this.state;
 
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  }
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
        loading
      } = this.state;

    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

    return (
      <FormBaseStyle title = "Inscription">
        <form autoComplete="off" onSubmit={this.onSubmit}>
        <div style = {{width:"100%"}}>
              <TextField 
                  variant="outlined" 
                  label="Prénom" 
                  name="username" 
                  type = "text"
                  value={username} 
                  onChange={this.onChange}
                  style = {{marginBottom:"20px"}}
                  fullWidth
                  required
              />
          </div>
          <div style = {{width:"100%"}}>
              <TextField 
                  variant="outlined" 
                  label="Adresse email" 
                  name="email" 
                  type = "email"
                  value={email} 
                  onChange={this.onChange}
                  style = {{marginBottom:"20px"}}
                  fullWidth
                  required
              />
          </div>
          <div style = {{width:"100%"}}>
              <TextField 
                  variant="outlined" 
                  label="Mot de passe" 
                  name="passwordOne" 
                  type = "password"
                  value={passwordOne} 
                  onChange={this.onChange}
                  style = {{marginBottom:"20px"}}
                  fullWidth
                  required
              />
          </div>
          <div style = {{width:"100%"}}>
              <TextField 
                  variant="outlined" 
                  label="Confirmation du mot de passe" 
                  name="passwordTwo" 
                  type = "password"
                  value={passwordTwo} 
                  onChange={this.onChange}
                  style = {{marginBottom:"20px"}}
                  fullWidth
                  required
              />
          </div>
          <Box color="error.main">
            {error && <p>{error.message}</p>}
          </Box>
          <div style = {{marginTop:'30px'}}>
          <Button  
          type = "submit" 
          disabled={isInvalid} 
          variant="contained" 
          color="primary" 
          className = {loading ? 'hidden' : null}
          size="large">
            S'inscrire
          </Button>
          {loading ? <CircularProgress /> : null}
          </div>
        </form>
      </FormBaseStyle>
      
    );
  }
}
 
const SignUpLink = () => (
  <p>
    Pas encore inscrit ? <Link to={ROUTES.SIGN_UP}>S'inscrire</Link>
  </p>
);
const SignUpForm = compose(
    withRouter,
    withFirebase,
  )(SignUpFormBase);
 
export default SignUpPage;
 
export { SignUpForm, SignUpLink };