const express = require('express');
const {connectDb} = require("./utils/db")
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');

const app = express();


app.get('/',(req,res)=>{
    res.status(200).json("server running")
})

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
// app.use('/discussions', discussionRoutes);

connectDb()
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
