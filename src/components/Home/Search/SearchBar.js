import React, { Component } from 'react';
import { TextField, IconButton, InputAdornment, Paper } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear';

class SearchBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            searchQuery:''
        }
    }
    handleChange = (e) => {
        this.props.changeSearchQuery(e.target.value.toLowerCase())
        this.setState({searchQuery :e.target.value})
    }

    clearQuery = (e) =>{
        this.setState({searchQuery:''})
        this.props.changeSearchQuery('')
    }

    render(){
        return(
                <div className = 'centered' style = {{marginBottom:'30px'}}>
                    <Paper 
                    variant = "outlined"
                    style = {{width:"100%",textAlign:'center'}}>
                        <TextField
                        autoFocus
                        label="Recherchez une piste"
                        variant='outlined'
                        fullWidth
                        type = 'text'
                        value = {this.state.searchQuery}
                        onChange = {this.handleChange}
                        InputProps={{
                            endAdornment: (
                            <InputAdornment>
                                <IconButton 
                                    className = {this.state.searchQuery ? '' : 'hidden'}
                                    onClick  = {this.clearQuery}>
                                    <ClearIcon color = 'primary'/>
                                </IconButton> 
                            </InputAdornment>
                            )
                        }}
                        />
                    </Paper>
                </div>
        )
    }
}

export default SearchBar;