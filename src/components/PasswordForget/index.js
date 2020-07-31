import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
 
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { Button, Box, CircularProgress, TextField } from '@material-ui/core';

import FormBaseStyle from "../FormBaseStyle"
import SimpleDialog from '../SimpleDialog';
 
const PasswordForgetPage = () => (
  <div style = {{width:"100%", height:"100%"}} className = "centered">
    <PasswordForgetForm />
  </div>
);
 
const INITIAL_STATE = {
  email: '',
  error: null,
  loading:false,
  dialog:false,
};
 
class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    this.setState({loading:true})
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({dialog:true});
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCloseDialog = () =>{
    this.props.history.push(ROUTES.HOME)
    this.setState({dialog:false})
  }
 
  render() {
    const { email, error, dialog, loading } = this.state;
 
    const isInvalid = email === '';
 
    return (
      <div>
        <FormBaseStyle title = "Mot de passe oublié">
          <form autoComplete="off" onSubmit={this.onSubmit}>
            <div style = {{width:"100%"}}>
                <TextField 
                    variant="outlined" 
                    label="Adresse email" 
                    name="email" 
                    type = "email"
                    value={this.state.email} 
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
            size="large"
            className = {loading ? "hidden" : null}
            >
              Réinitialiser mon mot de passe
            </Button>

            {loading ? <CircularProgress /> : null}
            </div>
          </form>
        </FormBaseStyle>     
        <SimpleDialog title = "Réinitialisation demandée !" open = {dialog} onClose = {() => this.setState({...INITIAL_STATE})}>
            <p>Un email pour réinitialiser votre mot de passe vous a été envoyé.</p>
            <Button color="primary" onClick = {this.handleCloseDialog}> Retourner à l'accueil </Button>
        </SimpleDialog>
      </div>
    );
  }
}
 
const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Mot de passe oublié ?</Link>
  </p>
);
 
export default PasswordForgetPage;
 
const PasswordForgetForm = withRouter(withFirebase(PasswordForgetFormBase));
 
export { PasswordForgetForm, PasswordForgetLink };