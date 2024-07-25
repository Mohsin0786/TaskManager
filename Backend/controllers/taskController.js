const Task = require('../models/Task');
require('dotenv').config();

const mongoose = require('mongoose');
// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private

exports.createTask = async (req, res) => {
    
    console.log("inside")

    try {
        const { title, description } = req.body;

    if (!title ||!description) {
        return res.status(400).json({ msg: 'Please fill all fields' });
    }
        const task = new Task({
            title,
            description,
            user: req.user._id
        });
    
        const createdTask = await task.save();
        res.status(201).json(createdTask);
    } catch (error) {
        console.error('Error in createTask:', error);
        res.status(500).json(error.message || error);
    }
    
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id })
        res.status(200).json({
            success: true,
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        console.error('Error in getTasks:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

exports.getTask = async (req, res) => {
    const id = req.params.id;
    try {
   
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user ID'
            });
        }
        const task = await Task.findById(id);
        console.log(id,task)
        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {
        console.error('Error in getTasks:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};


// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res) => {

    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user ID'
            });
        }
        const task = await Task.findById(id);
        console.log(task)
    
        if (task) {
            task.title = req.body.title || task.title;
            // task.status = req.body.status || task.status;
            task.description = req.body.description || task.description;
    
            const updatedTask = await task.save();
            console.log(updatedTask)
            res.json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
};


exports.updateStatus = async (req,res)=>{
    try {
        const { id } = req.params;
        const { status } = req.body;
        const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
        console.log("status",task)
        res.json(task);

      } catch (error) {
        res.status(500).send(error);
      }
    
}

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res) => {
    const id = req.params.id;
   
        try{
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid user ID'
                });
            }
            const task = await Task.findByIdAndDelete(id);
            console.log(task)
        
            if (!task) {
                // await task.remove();
                return res.status(404).json({ message: 'Task not found' });
           }
                res.json({ message: 'Task removed' });
            
        
    } catch (error) {
        res.status(500).json(error)
    }
};