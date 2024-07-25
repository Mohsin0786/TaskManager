import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Grid, Button, Box } from '@mui/material';
import { useDrag, useDrop } from 'react-dnd';
import { config } from '../constant';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import TaskDetailsModal from './TaskDetailModel';
import TaskEditModal from './TaskEditModel';

export default function ListTasks({ tasks, setTasks }) {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    setTodos(tasks?.filter(task => task.status === 'todo'));
    setInProgress(tasks?.filter(task => task.status === 'progress'));
    setClosed(tasks?.filter(task => task.status === 'closed'));
  }, [tasks]);

  const [selectedTask, setSelectedTask] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleDetailsModalOpen = (task) => {
    setSelectedTask(task);
    setDetailsModalOpen(true);
  };

  const handleEditModalOpen = (task) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedTask(null);
    setDetailsModalOpen(false);
    setEditModalOpen(false);
  };

  const status = ["todo", "progress", "closed"];

  return (
    <Container maxWidth="lg" sx={{
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Grid container spacing={2}>
        {status.map((status, index) => (
          <Grid item xs={4} key={index} sx={{
            minHeight: "550px",
            maxHeight: "700px"
          }}>
            <Section
              status={status}
              tasks={tasks}
              setTasks={setTasks}
              todos={todos}
              inProgress={inProgress}
              closed={closed}
              handleDetailsModalOpen={handleDetailsModalOpen}
              handleEditModalOpen={handleEditModalOpen}
            />
          </Grid>
        ))}
      </Grid>
      {selectedTask && (
        <TaskDetailsModal
          open={detailsModalOpen}
          handleClose={handleModalClose}
          task={selectedTask}
        />
      )}
      {selectedTask && (
        <TaskEditModal
          open={editModalOpen}
          handleClose={handleModalClose}
          selectedTask={selectedTask}
          setTasks={setTasks}
          tasks = {tasks}
        />
      )}
    </Container>
  );
}

const Section = ({ status, tasks, setTasks, todos, inProgress, closed, handleDetailsModalOpen, handleEditModalOpen }) => {
  const { token } = useAuth();
  const url = config.url.API_URL;
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "TODO";
  let bg = "#90caf9";
  let taskToMap = todos;

  if (status === "progress") {
    text = "IN PROGRESS";
    bg = "#64b5f6";
    taskToMap = inProgress;
  }
  if (status === "closed") {
    text = "DONE";
    bg = "#42a5f5";
    taskToMap = closed;
  }
  const previousTasks = JSON.parse(JSON.stringify(tasks));
  const addItemToSection = async (id) => {
    setTasks((prev) => {
      return prev.map((task) =>
        task._id === id ? { ...task, status: status } : task
      );
    });
    try {
      const response = await axios.patch(`${url}/api/tasks/task/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
    
     
    } catch (error) {
      setTasks(previousTasks)
      alert('Failed to move the cards')
      console.error('Error updating task status:', error);
    }
  };

  return (
    <Paper ref={drop} sx={{ height: '100%', p: 2, bgcolor: bg, overflowY: "scroll", '&::-webkit-scrollbar': { display: 'none' }, msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
      <Typography variant="h6" gutterBottom>{text}</Typography>
      {taskToMap?.map((task) => (
        <Task key={task._id} task={task} tasks={tasks} setTasks={setTasks} handleDetailsModalOpen={handleDetailsModalOpen} handleEditModalOpen={handleEditModalOpen} />
      ))}
    </Paper>
  );
}

const Task = ({ task, tasks, setTasks, handleDetailsModalOpen, handleEditModalOpen }) => {
  const { token } = useAuth();
  const url = config.url.API_URL;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleDelete = async () => {
    try {
      await axios.delete(`${url}/api/tasks/task/${task._id}`, { headers: { Authorization: `Bearer ${token}` } });
      setTasks((prev) => prev.filter((t) => t._id !== task._id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Paper
      ref={drag}
      elevation={3}
      sx={{
        p: 2,
        my: 2,
        cursor: 'grab',
        opacity: isDragging ? 0.5 : 1,
        bgcolor: '#e3f2fd'
      }}
    >
      <Typography variant="subtitle1">{task.name}</Typography>
      <Typography variant="body2" sx={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }}>{task.description}</Typography>
      <Typography variant="caption" display="block" gutterBottom>
        Created at: {new Date(task.createdAt).toLocaleString()}
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Button size="small" color="error" sx={{ mr: 1 }} onClick={handleDelete}>Delete</Button>
        <Button size="small" color="primary" sx={{ mr: 1 }} onClick={() => handleEditModalOpen(task)}>Edit</Button>
        <Button size="small" color="primary" onClick={() => handleDetailsModalOpen(task)}>View Details</Button>
      </Box>
    </Paper>
  );
}
