const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware to check authentication
exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const extractedToken = token.split(' ')[1]; // Extract the actual token
       

        // Verify token
        const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET);

        // Fetch user from DB
        const user = await User.findById(decoded.userId).select('-password'); // Exclude password for security
        if (!user) return res.status(404).json({ message: 'User not found' });

        req.user = user; // Attach user object to request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token', error });
    }
};

// Middleware to check admin role
exports.adminMiddleware = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access Denied. Admins only' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Authorization error', error });
    }
};
