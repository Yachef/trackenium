import React, { Component } from 'react';

import { Paper, Fab, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

import {withFirebase} from '../Firebase'

class UserTopbar extends Component{
    constructor(props){
        super(props)
        this.state = {
            username:'',
            loading:true
        }
    }
    componentDidMount(){
        this.props.firebase.user(this.props.authUser.uid).on('value', snapshot => {
            this.setState({username:snapshot.val().username,loading:false})
          })
    }

    componentWillUnmount(){
        this.props.firebase.user(this.props.authUser.uid).off()
    }

    showUserInfos = () => (
        <Paper style = {{padding:"20px"}}>
            <div className="centered">
                <div>
                    <Fab color="primary" aria-label="add" disabled>
                        <Typography variant = "h4">D</Typography>
                    </Fab>
                </div>
                <div>
                    <p>{this.state.username}</p>
                    <p>{this.props.authUser.metadata.creationTime}</p>
                </div>
            </div>
        </Paper>
    )

    render(){
        return ( 
            this.state.loading ? "Loading..." : this.showUserInfos()
        );
    }

}
 
export default withFirebase(UserTopbar);