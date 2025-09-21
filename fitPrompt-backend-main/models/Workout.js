const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: String,
  reps: String,
  rest: Number,
  notes: String
});

const dayPlanSchema = new mongoose.Schema({
  focusArea: String,
  exercises: [exerciseSchema],
  notes: String
});

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan: {
    Monday: dayPlanSchema,
    Tuesday: dayPlanSchema,
    Wednesday: dayPlanSchema,
    Thursday: dayPlanSchema,
    Friday: dayPlanSchema,
    Saturday: dayPlanSchema,
    Sunday: dayPlanSchema
  },
  generatedAt: {
    type: Date,
    default: Date.now
  },
  active: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Workout', workoutSchema);