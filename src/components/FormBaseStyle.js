import React from 'react';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const FormBaseStyle = ({title, children}) => {
    return ( 

        <Paper variant = "outlined" style = {{padding:"50px",width:"400px",textAlign:'center'}}>
            <Typography variant = "h1" style = {{marginBottom:'40px'}}>
                {title}
            </Typography>
            {children}
        </Paper>
     );
}
 
export default FormBaseStyle;