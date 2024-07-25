import React,{useState,useEffect} from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CreateTask from '../components/CreateTask'
import ListTasks from '../components/ListTasks';
import Container from '@mui/material/Container';
import { config } from '../constant'
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
export default function Dashboard() {
  const { userId, token,isAuth } = useAuth()
  const [tasks, setTasks] = useState(null);
  useEffect(() => {
    const url = config.url.API_URL
    console.log(userId)
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${url}/api/tasks`,
         { headers: { Authorization: `Bearer ${token}` }});
        setTasks(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [token]);

  return (
    <>
    <Navbar isAuth={isAuth}/>
      <Container sx={{height:"100%"}}>
      <DndProvider backend={HTML5Backend}>
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </DndProvider>
        </Container>
    </>
  )
}
