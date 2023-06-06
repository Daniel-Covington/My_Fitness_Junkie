const router = require("express").Router();

const userRoutes = require("./api/userRoutes");
const workoutRoutes = require("./api/workoutRoutes");
const homeRoutes = require("./homeRoutes");
const profileRoutes = require("./profileRoutes");
const youtubeRoutes = require("./api/youtubeRoutes");

router.use("/", homeRoutes);
router.use("/api/users", userRoutes);
router.use("/api/workouts", workoutRoutes);
router.use("/profile", profileRoutes);
router.use("/api/youtubeRoutes", youtubeRoutes);

module.exports = router;
