import app from 'firebase/app';
import 'firebase/auth'
import 'firebase/database';
import 'firebase/storage';
 
const config = {
  apiKey: "AIzaSyCNa_Kqdu6LQNkRjWYUw0mU-IOjgRbv5Ds",
  authDomain: "trackenium.firebaseapp.com",
  databaseURL: 'https://trackenium.firebaseio.com',
  projectId: 'trackenium',
  storageBucket: '541828254607',
  messagingSenderId: '1:541828254607:web:dbb0024a946f45e08bd9fa',
};
 
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth()
    this.db = app.database();
    this.storage = app.storage()
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Tracks API ***

  tracks = () => this.db.ref('tracks')

  // *** Storage API ***

  audioFiles = () => this.storage.ref();

}
 
export default Firebase;