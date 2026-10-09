
const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Get user profile
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({
      message: "Profile fetched successfully!",
      profile: user,
    });
  } catch (error) {
    res.status(400).json({ message: "Unable to fetch profile." });
  }
});

// Update user profile
router.put("/:userId", async (req, res) => {
  try {
    const { name, careerGoal, githubUsername, linkedin } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { name, careerGoal, githubUsername, linkedin },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({
      message: "Profile updated successfully!",
      profile: user,
    });
  } catch (error) {
    res.status(400).json({ message: "Unable to update profile." });
  }
});

module.exports = router;