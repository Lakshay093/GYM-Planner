const mongoose = require("mongoose");
const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const User = require("../models/User");
const Workout = require("../models/Workout");
const { generateWorkout } = require("../controllers/workoutController");

// Get all users (admin route to view data)
router.get("/all", auth, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all workouts (admin route to view data)
router.get("/workouts/all", auth, async (req, res) => {
  try {
    const workouts = await Workout.find().populate('user', 'firstName lastName email');
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user profile
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user profile
router.post("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user profile fields
    Object.assign(user, req.body, { profileCompleted: true });
    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Save workout plan
router.post("/workout", auth, async (req, res) => {
  try {
    const isUserExsit = await User.findById(req.user.id);
    if (!isUserExsit) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(
      "📥 Incoming workout payload:",
      JSON.stringify(req.body, null, 2)
    );

    // Directly push the workout plan to the workoutPlans array
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          workoutPlans: {
            weeklySchedule: req.body.weeklySchedule,
          },
        },
        $set: { workoutPlanGeneratedAt: new Date() },
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Workout saved successfully", user });
  } catch (err) {
    console.error("Error saving workout:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
