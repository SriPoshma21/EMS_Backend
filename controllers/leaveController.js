const Leave = require('../models/leaveModel');

// Create a new leave request
exports.createLeave = async (req, res) => {
  try {
    const { type, subject, description, startDate, noOfDays, employeeName, employeeId } = req.body;

    const newLeave = new Leave({
      type,
      subject,
      description,
      startDate,
      noOfDays,
      employeeName,
      employeeId
    });

    await newLeave.save();
    res.status(201).json({ message: 'Leave request created successfully', leave: newLeave });
  } catch (error) {
    res.status(500).json({ message: 'Error creating leave request', error });
  }
};

// Get all leave requests
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.status(200).json({ data: leaves });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leave requests', error });
  }
};

// Get leave requests by Employee ID
exports.getLeavesByEmployeeId = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const leaves = await Leave.find({ employeeId });

    if (!leaves.length) return res.status(404).json({ message: 'No leave requests found for this employee' });

    res.status(200).json({ data: leaves });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leave requests', error });
  }
};

// Update leave status (Approve/Reject)
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedLeave = await Leave.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedLeave) return res.status(404).json({ message: 'Leave request not found' });

    res.status(200).json({ message: 'Leave status updated successfully', leave: updatedLeave });
  } catch (error) {
    res.status(500).json({ message: 'Error updating leave status', error });
  }
};
