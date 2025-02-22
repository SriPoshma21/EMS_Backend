const express = require('express');
const { loginUser, getAllUsers, createUser, updateUser, deleteUser, getUserById, changePassword } = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware.js');

const router = express.Router();

// Define Routes
router.post('/login',loginUser); // login User {generates JWT token}
router.get('/',authMiddleware,adminMiddleware ,getAllUsers); // get all Users {authentication and admin access}
router.get('/:id',authMiddleware, getUserById); // get userdata by id {only authentication}
router.post('/',authMiddleware,adminMiddleware, createUser); // create a new user {authentication and admin access}
router.put('/:id',authMiddleware,adminMiddleware, updateUser); // update user details {authentication and admin access}
router.put('/changepassword/:id',authMiddleware, changePassword); // change user password self {only authentication}
router.delete('/:id',authMiddleware,adminMiddleware, deleteUser); // delete existing user {authentication and admin access}

module.exports = router;
