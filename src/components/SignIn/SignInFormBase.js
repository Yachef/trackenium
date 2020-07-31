 
import React, { Component } from 'react';

import * as ROUTES from '../../constants/routes';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { CircularProgress } from '@material-ui/core';

import FormBaseStyle from '../FormBaseStyle';


const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
    loading:false
  };

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    this.setState({loading:true})
    const { email, password } = this.state;
 
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const { email, password, error, loading } = this.state;
 
    const isInvalid = password === '' || email === '';
 
    return (
      <FormBaseStyle title = "Connexion">
        <form autoComplete="off" onSubmit={this.onSubmit}>
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
            <div>
                <TextField variant="outlined" 
                    label="Mot de passe"
                    name="password"
                    type = "password"
                    value={password}
                    onChange={this.onChange}
                    required
                    fullWidth
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
            className = {loading ? "hidden" : null}
            size="large">
              Connexion
            </Button>
            {loading ? <CircularProgress /> : null}
            </div>
        </form>
      </FormBaseStyle>
    );
  }
}

export default SignInFormBase;