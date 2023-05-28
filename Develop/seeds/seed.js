const sequelize = require("../config/connection");
const { User, Workout, UserDetail } = require("../models");
const userData = require("./userData.json");
const workoutData = require("./workoutData.json");
const userDetailsData = require("./userDetailsData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const workouts = await Workout.bulkCreate(workoutData, {
    returning: true,
  });

  const userDetailsDataWithAssociations = userDetailsData.map(
    (userDetail, i) => ({
      ...userDetail,
      user_id: users[i].id,
      workout_id: workouts[i].id,
    })
  );

  await UserDetail.bulkCreate(userDetailsDataWithAssociations);

  process.exit(0);
};
seedDatabase();
