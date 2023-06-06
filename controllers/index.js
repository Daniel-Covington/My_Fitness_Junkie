const router = require("express").Router();

const userRoutes = require("./api/userroutes");
const workoutRoutes = require("./api/workoutroutes");
const homeRoutes = require("./homeroutes");
const profileRoutes = require("./profileroutes");
const youtubeRoutes = require("./api/youtuberoutes");

router.use("/", homeRoutes);
router.use("/api/users", userRoutes);
router.use("/api/workouts", workoutRoutes);
router.use("/profile", profileRoutes);
router.use("/api/youtubeRoutes", youtubeRoutes);

module.exports = router;
