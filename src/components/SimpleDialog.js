import React from 'react';
import { DialogContent, Dialog, DialogTitle } from '@material-ui/core';


const SimpleDialog = ({title, children, onClose, open }) => {
    const handleClose = () => {
      onClose();
    };
  
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
        <DialogContent>
            {children}
        </DialogContent>
      </Dialog>
    );
}
 
export default SimpleDialog;