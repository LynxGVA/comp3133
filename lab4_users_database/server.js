require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();
app.use(express.json());

app.post("/users", async (req, res) => {
  try {
    const created = await User.create(req.body);
    return res.status(201).json({ message: "User created", user: created });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: "Validation failed", errors });
    }

    if (err.code === 11000) {
      return res.status(400).json({
        message: "Validation failed",
        errors: ["email must be unique"],
      });
    }

    return res.status(500).json({ message: "Server error", error: err.message });
  }
});

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const port = process.env.PORT || 8081;
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  } catch (e) {
    console.log("Startup error:", e.message);
    process.exit(1);
  }
}

start();
