import React, { Component } from 'react';
import { TextField, IconButton, InputAdornment, Paper } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

class SearchBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            searchQuery:'',
        }
    }
    handleChange = (e) => {
        this.setState({searchQuery:e.target.value})

    }

    render(){
        return(
                <div className = 'centered' style = {{marginBottom:'30px'}}>
                    <Paper 
                    variant = "outlined"
                    style = {{width:"100%",textAlign:'center'}}>
                        <TextField
                        label="Recherchez une musique"
                        variant='outlined'
                        fullWidth
                        type = 'text'
                        value = {this.state.searchQuery}
                        onChange = {this.handleChange}
                        InputProps={{
                            startAdornment:(
                                <InputAdornment>
                                    <IconButton 
                                        className = {this.state.searchQuery ? '' : 'hidden'}
                                        onClick  = {() => this.setState({searchQuery:''})}>
                                        <ClearIcon color = 'primary'/>
                                    </IconButton> 
                                </InputAdornment>
                            ),
                            endAdornment: (
                            <InputAdornment>
                                <IconButton
                                    onClick  = {() => console.log("test")}>
                                <SearchIcon />
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