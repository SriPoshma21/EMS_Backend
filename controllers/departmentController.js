const Department = require('../models/departmentModel');

// Create a new department
exports.createDepartment = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if department already exists
        const existingDepartment = await Department.findOne({ name });
        if (existingDepartment) return res.status(400).json({ message: 'Department already exists' });

        const newDepartment = new Department({ name });
        await newDepartment.save();

        res.status(201).json({ message: 'Department created successfully', department: newDepartment });
    } catch (error) {
        res.status(500).json({ message: 'Error creating department', error });
    }
};

// Get all departments
exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json({ data: departments });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching departments', error });
    }
};

// Delete a department
exports.deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedDepartment = await Department.findByIdAndDelete(id);
        if (!deletedDepartment) return res.status(404).json({ message: 'Department not found' });

        res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting department', error });
    }
};
