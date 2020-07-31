import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';
 
import SignInFormBase from './SignInFormBase'
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

 
const SignInPage = () => (
  <div className = "centered"style = {{height:"100%"}}>
    <div>
      <SignInForm />
      <div style = {{display:'flex',justifyContent:'space-between'}}>
        <PasswordForgetLink />
        <SignUpLink />
      </div>
    </div>
  </div>
);
 
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

const SignInLink = () => (
  <p>
    Déjà inscrit ? <Link to={ROUTES.SIGN_IN}>Se connecter</Link>
  </p>
)
 
export default SignInPage;
 
export { SignInForm, SignInLink };