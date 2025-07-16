const User = require('../models/usersModel');

async function handleUserRegistration(req, res) {
    const { name, email, password } = req.body;

    try {
        const user = await User.create({ name, email, password });
        res.status(201).json({message : "Registration Successful" , user : user});
    } catch (error) {
        res.status(400).json({ error: 'Error creating user', details: error.message });
    }
}

async function handleUserLogin(req, res){
    const {email, password} = req.body;

    const user = await User.findOne({email,password});
    if(!user ) return res.status(555).json({message : "Enter Correct Credentials"});

    return res.status(200).json({message : "Login Succesfull"});
}

async function handleGetAllUsers(req, res) {
    const users = await User.find({});
    res.status(200).json(users);
}

async function handleGetUserById(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleUpdateUser(req, res) {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { lastName: req.body.lastName }
        );
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleDeleteUser(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    handleUserRegistration,
    handleUserLogin,
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUser,
    handleDeleteUser
};