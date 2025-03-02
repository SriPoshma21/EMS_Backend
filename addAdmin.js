require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/userModel");

mongoose.connect(process.env.MONGO_URL);

const seedAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash("admin2001", 10);

    const adminUser = new User({
      name: "Admin User",
      email: "admin@gmail.com",
      id: "ADMIN001",
      gender: "Male",
      department: "Management",
      designation: "System Admin",
      salary: 100000,
      role: "Admin",
      password: hashedPassword,
    });

    await adminUser.save();
    console.log("✅ Admin user inserted successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error inserting admin user:", error);
    mongoose.connection.close();
  }
};

seedAdmin();
