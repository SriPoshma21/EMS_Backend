const express = require('express');
const { createDepartment, getAllDepartments, deleteDepartment } = require('../controllers/departmentController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/', authMiddleware, adminMiddleware, createDepartment); // create a new department {authentication and admin access}
router.get('/', authMiddleware,adminMiddleware, getAllDepartments); // get all departments {authentication and admin access}
router.delete('/:id', authMiddleware, adminMiddleware, deleteDepartment); // delete departments {authentication and admin access}

module.exports = router;
