const router = require("express").Router();
const { User, UserDetail, WeightHistory } = require("../models");
const withAuth = require("../utils/auth");
const { Op } = require("sequelize");

router.get("/weighthistory/chart", withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const range = req.query.range;

    let startDate;
    const endDate = new Date();
    switch (range) {
      case 'week':
        startDate = new Date();
        startDate.setDate(endDate.getDate() - 7);
        break;
      case 'month':
        startDate = new Date();
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case 'threeMonths':
        startDate = new Date();
        startDate.setMonth(endDate.getMonth() - 3);
        break;
      case 'year':
        startDate = new Date();
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      default:
        return res.status(400).json({ message: 'Invalid range parameter' });
    }

    const weightHistory = await WeightHistory.findAll({
      where: {
        user_id: userId,
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      order: [['date', 'ASC']],
    });

    if (!weightHistory) {
      return res.status(404).json({ message: 'No weight history found for this user in the given range' });
    }

    res.json(weightHistory);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post("/weighthistory", withAuth, async (req, res) => {
  try {
    const { user_id, weight, date } = req.body;

    // Create a new weight history record
    const newWeightHistory = await WeightHistory.create({
      user_id: user_id,
      weight: weight,
      date: date,
    });

    res.status(201).json({ message: "Weight history record created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});



router.get("/workouts", async (req, res) => {
  try {
    const workoutData = await loadTopWorkouts();
    res.json(workoutData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/", withAuth, async (req, res) => {
  try {
    const userDetailsData = await UserDetail.findOne({
      where: { user_id: req.session.user_id },
      include: { model: User },
    });

    if (!userDetailsData) {
      console.log("No user detail found for this user");
      return res
        .status(404)
        .json({ message: "No user detail found for this user" });
    }

    res.render("profile", {
      name: userDetailsData.User.name,
      userDetails: userDetailsData,
      user_id: req.session.user_id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.put("/update/:id", withAuth, async (req, res) => {
  try {
    console.log(req.body);
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);
    const bmi = (weight / (height * height)) * 703; // calculating BMI

    const userDetailData = {
      weight: weight,
      height: height,
      bmi: bmi, // adding the calculated BMI
      goal_weight: req.body.goalWeight,
      user_id: req.params.id,
      activity_level: req.body.activityLevel,
      fitness_goal: req.body.fitnessGoal,
      dietary_preference: req.body.dietaryPreference,
      resting_heart_rate: req.body.restingHeartRate,
      blood_pressure: req.body.bloodPressure,
      // sleep_data: req.body.sleep_data ? JSON.parse(req.body.sleep_data) : null,
      // body_measurements: req.body.body_measurements ? JSON.parse(req.body.body_measurements) : null,
    };

    // Attempt to find or create a UserDetail record
    const [userDetails, created] = await UserDetail.findOrCreate({
      where: {
        user_id: userDetailData.user_id,
      },
      defaults: userDetailData, // used if a new instance needs to be created
    });

    if (!created) {
      // if an instance already existed, update it
      await userDetails.update(userDetailData);
    }

    res.status(200).json({ message: "User details updated successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


module.exports = router;
