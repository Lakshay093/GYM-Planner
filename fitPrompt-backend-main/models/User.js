const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileCompleted: {
    type: Boolean,
    default: false,
  },
  // Basic Info
  gender: {
    type: String,
    enum: ["Male", "Female", "Non-binary", "Prefer not to say"],
  },
  dateOfBirth: Date,
  height: Number,
  weight: Number,
  bodyFatPercent: Number,

  // Fitness Goals
  fitnessGoal: {
    type: String,
    enum: [
      "Fat loss",
      "Muscle gain",
      "Endurance",
      "Body recomposition",
      "Health",
      "Sports prep",
    ],
  },
  targetWeight: Number,
  timeline: String,

  // Fitness Experience
  fitnessLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
  },
  workoutLocation: {
    type: String,
    enum: ["Gym", "Home", "Both", "Neither"],
  },
  workoutDaysPerWeek: Number,
  preferredTrainingTypes: [String],
  dietPlan: String,
  medicalConditions: String,

  // Lifestyle & Activity
  activityLevel: {
    type: String,
    enum: ["Sedentary", "Lightly Active", "Active", "Very Active"],
  },
  sleepHours: Number,
  stressLevel: {
    type: String,
    enum: ["Low", "Medium", "High"],
  },

  // Workout Preferences
  focusAreas: [String],
  workoutDuration: {
    type: Number,
    enum: [30, 45, 60, 90],
  },
  workoutTimePreference: {
    type: String,
    enum: ["Morning", "Afternoon", "Evening", "No preference"],
  },
  // Remove the 'workouts' array reference and add a new 'workoutPlans' field for embedded data
  workoutPlans: [{
    weeklySchedule: [{
      day: String,
      focus: String,
      exercises: [
        {
          name: String,
          sets: String,
          reps: String,
          notes: String
        }
      ]
    }]
  }],
  // Add the new field here
  workoutPlanGeneratedAt: {
    type: Date,
    default: Date.now
  },
  activeWorkout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workout",
  },
}, { timestamps: true });

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
