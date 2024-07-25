import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function TaskDetailsModal({ open, handleClose, task }) {
  return (
    <Dialog open={open} onClose={handleClose}  PaperProps={{
        sx: {
         maxWidth: "800px",
    minWidth: "700px",
    minHeight: "550px"
        }
      }}>
      <DialogTitle>Task Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Title: {task?.title}</Typography>
        <Typography>Description: {task?.description}</Typography>
        <Typography>Created at: {new Date(task?.createdAt).toLocaleString()}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{
          background: "#0c3b69",
          color: "white",
          '&:hover': {
      backgroundColor: '#0c3b69',
      opacity:0.5
      // Other hover styles if needed
    }
        }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
