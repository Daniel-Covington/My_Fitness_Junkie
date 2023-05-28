const router = require("express").Router();
const { User, UserDetail } = require("../models");
const withAuth = require("../utils/auth");

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
    const bmi = (weight / (height * height)) * 703; // calculating BMI // calculating BMI

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

    const userDetails = await UserDetail.findOne({
      where: {
        user_id: userDetailData.user_id,
      },
    });

    if (userDetails) {
      await userDetails.update(userDetailData);
      res.status(200).json({ message: "User details updated successfully" });
    } else {
      res.status(404).json({ message: "No user details found with this id!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
