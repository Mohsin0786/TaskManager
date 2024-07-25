const express = require('express');
const {
    createTask,getTasks,updateTask,deleteTask,getTask,updateStatus
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .get(protect, getTasks)
    .post(protect, createTask);

router.route('/:id')
    .put(protect, updateTask)
    
    
// router.delete('/:id', protect, deleteUser);
router.route('/task/:id')
    .put(protect, getTask)
    .patch(protect, updateStatus)
    .delete(protect, deleteTask)
// router.get('/search', protect, searchUser);
// router.post('/follow/:id', protect, followUser);

module.exports = router;
