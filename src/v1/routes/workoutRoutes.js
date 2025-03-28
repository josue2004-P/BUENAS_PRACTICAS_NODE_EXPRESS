const express = require("express");
const router = express.Router();
const workoutController = require("../../controllers/workoutController")

router
	.get("/", workoutController.getAllWorkouts)
	.get("/:workoutId",workoutController.getOneWorkouts)
	.post("/",workoutController.createNewWorkouts)
	.patch("/", workoutController.updateOneWorkout)
	.delete("/:workoutId", workoutController.deleteOneWorkout);

module.exports = router;
