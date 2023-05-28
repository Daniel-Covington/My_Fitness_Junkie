const router = require("express").Router();
// const { default: axios } = require('axios');
const { Workout } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const {
      type,
      description,
      duration,
      distance,
      sets,
      reps,
      weight,
      intensity,
      heart_rate,
    } = req.body;

    const newWorkout = await Workout.create({
      type,
      description,
      duration,
      distance,
      sets,
      reps,
      weight,
      intensity,
      heart_rate,
      caloriesBurned: 0, // Default value or handle appropriately
      rating: 0, // Default value or handle appropriately
      notes: "", // Default value or handle appropriately
      user_id: req.session.user_id,
    });

    res.status(200).json(newWorkout);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  console.log("Workout ID: ", req.params.id);
  console.log("User ID: ", req.session.user_id);
  try {
    const workoutData = await Workout.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!workoutData) {
      res.status(404).json({ message: "No workout found with this id!" });
      return;
    }

    res.status(200).json(workoutData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
