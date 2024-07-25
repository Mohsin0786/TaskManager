const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');


exports.createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ firstName, lastName, email,password: bcrypt.hashSync(password, 8)});
        await user.save();
        const userResponse = { id: user._id, name: user.firstName +" "+ user.lastName, email: user.email };
        res.status(201).json(userResponse);
    } catch (err) {
        if (err.message.includes('E11000')) {
            // Handle duplicate key error (more specific message can be crafted here)
            res.status(400).json({ error: 'User already exists with this mobile number' });
        } else {
            // Handle other errors
            res.status(500).json({ error: err.message });
        }
    }
};

exports.loginUser = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log(user)
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });


        res.json({ Name:`${user.firstName} ${user.lastName}`,userId:user._id,token});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};