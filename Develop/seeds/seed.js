const sequelize = require('../config/connection');
const { User, Workout } = require('../models');
const userData = require('./userData.json');
const workoutData = require('./workoutData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const workout of workoutData) {
    await Workout.create({
      name: workout.name, 
      type: workout.type,
      duration: workout.duration,
      intensity: workout.intensity,
      caloriesBurned: workout.caloriesBurned,
      date: workout.date,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
