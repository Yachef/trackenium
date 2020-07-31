import React, { Component } from 'react';
 
import { withFirebase } from '../Firebase';
import { Box, CircularProgress, Button, TextField } from '@material-ui/core';
import FormBaseStyle from '../FormBaseStyle';
 
const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
  loading:false,
  success:false
};
 
class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    this.setState({loading:true})
    const { passwordOne } = this.state;
 
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.setState({success:true})
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
    const { passwordOne, passwordTwo, error, loading, success } = this.state;
 
    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';
 
    return (
      <FormBaseStyle title = "Changement de mot de passe">
        <form autoComplete="off" onSubmit={this.onSubmit}>
            <div style = {{width:"100%"}}>
                <TextField 
                    variant="outlined" 
                    label="Nouveau mot de passe" 
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    style = {{marginBottom:"20px"}}
                    fullWidth
                    required
                />
            </div>
            <div style = {{width:"100%"}}>
                <TextField 
                    variant="outlined" 
                    label="Confirmation du nouveau mot de passe" 
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
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
            className = {(!loading && !success) ? null : "hidden"}
            size="large">
              Changer mon mot de passe
            </Button>
            {(loading && !success)? <CircularProgress /> : null}
            {success ?
            <Box color="success.main">
              Mot de passe modifié avec succès
            </Box>:null}
            </div>
        </form>
      </FormBaseStyle>
    );
  }
}
 
export default withFirebase(PasswordChangeForm);