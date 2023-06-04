const sequelize = require("../config/connection");
const { User, Workout, UserDetail, WeightHistory } = require("../models");
const userData = require("./userData.json");
const workoutData = require("./workoutData.json");
const userDetailsData = require("./userDetailsData.json");
const weightHistoryData = require("./WeightHistory.json");

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   const users = await User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });

//   const workouts = await Workout.bulkCreate(workoutData, {
//     returning: true,
//   });

//   const userDetailsDataWithAssociations = userDetailsData.map(
//     (userDetail, i) => ({
//       ...userDetail,
//       user_id: users[i].id,
//       workout_id: workouts[i].id,
//     })
//   );

//   await UserDetail.bulkCreate(userDetailsDataWithAssociations);

//   process.exit(0);
// };
// seedDatabase();


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (let userDetails of userDetailsData) {
    await UserDetail.create({
      ...userDetails,
      user_id: users.find(user => user.id === userDetails.user_id).id,
    });
  }

  for (let workout of workoutData) {
    await Workout.create({
      ...workout,
      user_id: users.find(user => user.id === workout.user_id).id,
    });
  }

  for (let weightHistory of weightHistoryData) { 
    await WeightHistory.create({
      ...weightHistory,
      user_id: users.find(user => user.id === weightHistory.user_id).id,
    });
  }

  process.exit(0);
};

seedDatabase();
