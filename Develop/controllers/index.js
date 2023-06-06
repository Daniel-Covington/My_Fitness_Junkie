const router = require("express").Router();

const userRoutes = require("./api/userRoutes");
const workoutRoutes = require("./api/workoutRoutes");
const homeRoutes = require("./homeRoutes");
const profileRoutes = require("./profileRoutes");
const youtubeRoutes = require("../public/js/youtubeRoutes").default;

router.use("/", homeRoutes);
router.use("/api/users", userRoutes);
router.use("/api/workouts", workoutRoutes);
router.use("/profile", profileRoutes);

module.exports = router;
