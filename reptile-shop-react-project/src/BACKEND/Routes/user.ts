require('dotenv').config();
import express from 'express';
const { User } = require('./models');
const router = express.Router();

router.post('/CreateAccount', async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    try 
    {
        const user = new User({
            firstName,
            lastName,
            email,
            password,
            role: role || "user"
        });
        const savedUser = await user.save();
        res.status(201).send({ user: savedUser });
    } catch (error) {
        console.error('Error saving user or creating account:', error)
    }
})
module.exports = router;
