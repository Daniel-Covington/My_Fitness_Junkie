const router = require("express").Router();
const axios = require("axios");
const { Workout, User, UserDetail, WeightHistory } = require("../models");
const withAuth = require("../utils/auth");


router.get("/", async (req, res) => {
  console.log("Inside /profile route");
  try {
    // Get all workouts and JOIN with user data
    const workoutData = await Workout.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const workouts = workoutData.map((workout) => workout.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("homepage", {
      workouts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/workout/:id", async (req, res) => {
  try {
    const workoutData = await Workout.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const workout = workoutData.get({ plain: true });

    res.render("workout", {
      ...workout,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/api/weighthistory/chart", withAuth, async (req, res) => {
  try {
      // Retrieve the range query parameter from the request URL
      const range = req.query.range;

      // Calculate the start date based on the range
      const startDate = moment().subtract(1, range).format("YYYY-MM-DD");

      // Get the weight history for the logged-in user within the specified range
      const weightHistory = await WeightHistory.findAll({
          where: {
              user_id: req.session.user_id,
              date: {
                  [Op.gte]: startDate
              }
          },
          order: [["date", "ASC"]],
      });

      if (!weightHistory) {
          throw new Error('Weight history not found');
      }

      // Convert the weight history data into chart data
      const chartData = weightHistory.map(entry => ({
          date: entry.date,
          weight: entry.weight,
          bmi: entry.bmi
      }));

      // Send the weight chart data as a JSON response
      res.json(chartData);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to retrieve weight chart data" });
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Workout }, { model: UserDetail }],
    });

    console.log("userData: ", userData);
    console.log("req.session: ", req.session);

    const user = userData.get({ plain: true });

    console.log(user);
    res.render("profile", {
      ...user,
      ...user.userdetail,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
