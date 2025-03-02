const express = require('express');
const { createLeave, getAllLeaves, getLeavesByEmployeeId, updateLeaveStatus } = require('../controllers/leaveController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/',authMiddleware, createLeave); // Create Leave {only authentication}
router.get('/',authMiddleware,adminMiddleware, getAllLeaves); // Get All Leaves {authentication and admin access}
router.get('/:employeeId',authMiddleware, getLeavesByEmployeeId); // Get Leaves by Employee ID {only authentication}
router.patch('/:id',authMiddleware,adminMiddleware, updateLeaveStatus); // Update Leave Status {authentication and admin access}

module.exports = router;
