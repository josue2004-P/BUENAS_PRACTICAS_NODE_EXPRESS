const express = require("express");
const router = express.Router();

router
	.get("/",(req,res) => {
		res.send("Get all workouts");
	})
	.get("/:workoutId",(req,res) => {
		res.send(`Create workout ${req.params.workoutId}`);
	})
	.post("/",(req,res) => {
		res.send(`Post`);
	})
	.patch("/",(req,res) => {
		res.send(`PATCH`);
	})
	.delete("/:workoutId",(req,res) => {
		res.send(`DELETE`);
	});

module.exports = router;
