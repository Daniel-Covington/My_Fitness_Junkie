const router = require("express").Router();
const { User, UserDetail } = require("../../models");
const axios = require("axios").default;
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { weight, height, goalWeight, activityLevel, fitnessGoal, dietaryPreference, restingHeartRate, bloodPressure } = req.body;
    const existingUserDetail = await UserDetail.findOne({ where: { user_id: id } });
    if (!existingUserDetail) {
      // Create a new UserDetail record for the user
      const newUserDetail = await UserDetail.create({
        id: id,
        user_id: id,
        weight: parseFloat(weight),
        height: parseFloat(height),
        goal_weight: parseFloat(goalWeight),
        activity_level: activityLevel,
        fitness_goal: fitnessGoal,
        dietary_preference: dietaryPreference,
        resting_heart_rate: parseInt(restingHeartRate),
        blood_pressure: bloodPressure
      });
      res.status(201).json({ message: "User detail created successfully!" });
      return;
    }
    // Update the existing UserDetail record
    const updatedUserDetail = await UserDetail.update(
      {
        weight: parseFloat(weight),
        height: parseFloat(height),
        goal_weight: parseFloat(goalWeight),
        activity_level: activityLevel,
        fitness_goal: fitnessGoal,
        dietary_preference: dietaryPreference,
        resting_heart_rate: parseInt(restingHeartRate),
        blood_pressure: bloodPressure
      },
      {
        where: { user_id: id }
      }
    );
    res.status(200).json({ message: "User detail updated successfully!" });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;

//hello world
