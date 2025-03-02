require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db.js");

const app = express();
const port = process.env.PORT || 10000;


// Import routes
const userRouter = require("./routes/userRoutes.js");
const leaveRouter = require("./routes/leaveRoutes.js");
const departmentRouter = require("./routes/departmentRoutes.js");

// Connect to database
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

// Define routes
app.use("/user", userRouter);
app.use("/leave", leaveRouter);
app.use("/dept", departmentRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
