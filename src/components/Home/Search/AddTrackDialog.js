import React, { Component } from 'react';

import { withAuthorization } from '../../Session'

import { DialogContent, DialogContentText, TextField, DialogActions, Button, Dialog, DialogTitle, CircularProgress } from '@material-ui/core';

const INITIAL_STATE = {
    title:'',
    author:'',
    media:[],
    loading:false,
    formSubmitted:false // used to off() the listener only when 1 submit has been done
  };

class AddTrackDialog extends Component{
    constructor(props){
        super(props)
        this.state = {...INITIAL_STATE}
    }

    onSubmit = (event) => {
        const {firebase} = this.props
        event.preventDefault();
        this.setState({loading:true,formSubmitted:true})
        const uploadFile = firebase.audioFiles().child(this.state.media[0]).put(this.state.media[1])

        uploadFile.on('state_changed',snapshot=> {
            },
            error => {
                alert(error)
            },
            () => {
                uploadFile.snapshot.ref.getDownloadURL().then((downloadURL)=> {
                    this.setState({loading:false})
                    this.props.firebase.tracks().push({
                        name:this.state.title,
                        author:this.state.author,
                        url:downloadURL,
                        createdBy:this.props.authUser.uid
                    }, (error)=> {
                        if(error){
                            alert(error)
                        }else{
                            this.setState({loading:false})
                            this.props.closeDialog()
                        }
                    })
                })
            }
        )
    }

    componentWillUnmount(){
        if(this.state.formSubmitted){
            this.props.firebase.audioFiles().child(this.state.media[0]).off()
        }
    }

    onChange = (event) =>{
        this.setState({ [event.target.name]: event.target.value })
    }
    closeDialog = () => {
        // this.setState({...INITIAL_STATE})
        this.props.closeDialog()
    }

    storeMedia = (e) => {
        if(e.target.files.length === 1){
            const file = e.target.files[0]
            this.setState({media:[file.name, file]})
        }
    }

    render(){
        return ( 
            <Dialog aria-labelledby="simple-dialog-title" open={this.props.open}>
                <DialogTitle>Ajouter une piste audio</DialogTitle>
                  <form onSubmit = {this.onSubmit}>
                      <DialogContent>
                        <DialogContentText>
                            Remplissez le formulaire ci-dessous pour ajouter une musique
                        </DialogContentText>
                        <TextField
                            autoFocus
                            value = {this.state.title}
                            onChange = {this.onChange}
                            margin="dense"
                            name='title'
                            label="Titre"
                            type="text"
                            fullWidth
                            required
                        />
                        <TextField
                            required
                            value = {this.state.author}
                            onChange = {this.onChange} 
                            margin="dense"
                            name="author"
                            label="Artiste(s)"
                            type="text"
                            fullWidth
                        />
                        <input
                            name="media"
                            type="file"
                            style={{ margin:'20px 0px' }}
                            accept="audio/*"
                            onChange = {this.storeMedia}
                        />
                        {this.state.loading ? <CircularProgress />: null}
                      </DialogContent>
                    <DialogActions>
                        <Button type = 'submit' color="primary">
                            Ajouter
                        </Button>
                        <Button onClick={this.closeDialog} color="secondary">
                            Annuler
                        </Button>
                    </DialogActions>
                  </form>
            </Dialog>
        );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AddTrackDialog);