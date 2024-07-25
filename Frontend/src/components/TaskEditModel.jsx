import React,{useState} from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from '@mui/material';
import { config } from '../constant'
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
export default function TaskEditModal({ open, handleClose,selectedTask,tasks,setTasks}) {
    console.log('TaskEditModal',selectedTask)
    const { token } = useAuth()

    const [editTask, seteditTask] = useState({
        title: selectedTask.title,
        description: selectedTask.description
    });

    const handleSubmit = async (e) => {
    
        e.preventDefault();
        const url = config.url.API_URL

        try {
            const response = await axios.put(`${url}/api/tasks/${selectedTask._id}`, editTask, { headers: { Authorization: `Bearer ${token}` } });
            const newTask = response.data;
            console.log("new",newTask)

            
            const newdata = tasks.map((value) => {
                if (selectedTask._id === value._id) {
                    return { ...value, title:editTask.title,description:editTask.description };
                }
                return value;
            });
            seteditTask({
                title: "",
                description: "",
            });
            console.log(newdata)
            setTasks(newdata);
            handleClose();
        } catch (error) {
            console.error('Failed to create task:', error);
        }
    };
    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{
            sx: {
                maxWidth: "800px",
                minWidth: "700px",
                minHeight: "550px"
            }
        }}>
            <DialogTitle>Edit Tasks</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="Task Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={editTask.title}
                    onChange={(e) => seteditTask({ ...editTask, title: e.target.value })}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={editTask.description}
                    onChange={(e) => seteditTask({ ...editTask, description: e.target.value })}
                />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleSubmit} sx={{
                    background: "#8080803b",
                    color: "black"
            }}>
                    Save
                </Button>
                <Button onClick={handleClose} sx={{
                    background: "grey",
                    color: "black"
                }}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
