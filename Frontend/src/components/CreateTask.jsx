import React, { useState } from 'react';
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  TextField,
  Box
} from '@mui/material';
import axios from 'axios';
import { config } from '../constant'
import { useAuth } from '../context/AuthContext';
export default function CreateTask({ tasks, setTasks }) {
    const { token } = useAuth()
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState({
    title: '',
    description:'',
    status: 'todo'
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTask({ title: '', description:'', status: 'todo' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = config.url.API_URL
  
    try {
      const response = await axios.post(`${url}/api/tasks/`, task, { headers: { Authorization: `Bearer ${token}` }});
      const newTask = response.data;

      setTasks((prevTasks) => [...prevTasks, newTask]);

      setTask({
        title: "",
        description: "",
        status: "todo"
      });
      handleClose();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <Box sx={{
        position: "absolute",
    top: "13%",
    left: "14%"
    }}>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Task Name"
            type="text"
            fullWidth
            variant="standard"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
           <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
