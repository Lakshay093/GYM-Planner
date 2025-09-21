const axios = require('axios');
const User = require('../models/User');
const Workout = require('../models/Workout');
const { WORKOUT_SYSTEM_PROMPT } = require('../config/prompts');

exports.generateWorkout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userProfile = {
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      height: user.height,
      weight: user.weight,
      bodyFatPercent: user.bodyFatPercent,
      fitnessGoal: user.fitnessGoal,
      fitnessLevel: user.fitnessLevel,
      activityLevel: user.activityLevel,
      workoutDaysPerWeek: user.workoutDaysPerWeek,
      workoutDuration: user.workoutDuration,
      preferredTrainingTypes: user.preferredTrainingTypes,
      focusAreas: user.focusAreas,
      dietPlan: user.dietPlan,
      medicalConditions: user.medicalConditions,
      sleepHours: user.sleepHours,
      stressLevel: user.stressLevel,
      targetWeight: user.targetWeight,
      timeline: user.timeline,
      workoutLocation: user.workoutLocation,
      workoutTimePreference: user.workoutTimePreference
    };

    const options = {
      method: 'POST',
      url: 'https://free-gpt-api.p.rapidapi.com/v1/chat/completions',
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'free-gpt-api.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        messages: [
          WORKOUT_SYSTEM_PROMPT,
          {
            role: 'user',
            content: `Here is the user profile:\n\n${JSON.stringify(userProfile, null, 2)}`
          }
        ]
      }
    };

    const response = await axios.request(options);
    const workoutPlan = JSON.parse(response.data.choices[0].message.content);

    // Deactivate previous active workout if exists
    if (user.activeWorkout) {
      await Workout.findByIdAndUpdate(user.activeWorkout, { active: false });
    }

    // Create new workout
    const workout = new Workout({
      user: user._id,
      plan: workoutPlan.plan
    });

    await workout.save();

    // Update user's workouts and active workout
    user.workouts.push(workout._id);
    user.activeWorkout = workout._id;
    await user.save();

    res.json({
      message: 'Workout plan generated successfully',
      workout: workout
    });
  } catch (error) {
    console.error('Workout generation error:', error);
    res.status(500).json({ 
      message: 'Failed to generate workout plan',
      error: error.message 
    });
  }
};