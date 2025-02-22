const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');


// Login API
exports.loginUser = async (req, res) => {
  try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

      // Create JWT Token (expires in 2 hours)
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

      res.status(200).json({ message: 'Login successful', token , role: user.role });
  } catch (error) {
      res.status(500).json({ message: 'Login error', error });
  }
};

// Get All Users
exports.getAllUsers = async (req,res) =>{
    try{
        const users = await User.find().select('-password') // Exclude password
        res.status(200).json({data : users})

    }
    catch (error){
        res.status(500).json({ message: 'Error fetching users', error });
    }
     

}

//Get a Single User by ID
exports.getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id).select('-password'); // Exclude password
  
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.status(200).json({ data: user });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error });
    }
  };


//Create a New User
exports.createUser = async (req, res) => {
  try {
    const { name, email, id, gender, department, designation, salary, role, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      name,
      email,
      id,
      gender,
      department,
      designation,
      salary,
      role,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Update User Details
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const updatedUser = await User.findOneAndUpdate({ id }, updates, { new: true });

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Change User Password
exports.changePassword = async (req, res) => {
    try {
      const { id } = req.params;
      const { oldPassword, newPassword } = req.body;
  
      // Find user by ID
      const user = await User.findOne({id});
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Check if old password is correct
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) return res.status(400).json({ message: 'Incorrect old password' });
  
      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
      // Update password
      user.password = hashedNewPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error changing password', error });
    }
  };


// Delete a User
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findOneAndDelete({ id });

    if (!deletedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
