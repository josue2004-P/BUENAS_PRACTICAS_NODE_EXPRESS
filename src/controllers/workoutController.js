const workoutService = require("../services/workoutService")

const getAllWorkouts = (req,res) => {
    const allWorkouts = workoutService.getAllWorkouts();
    res.send("Get all workouts")
}

const getOneWorkouts = (req,res) => {

    const workout = workoutService.getOneWorkouts(req.params.workoutId);
    res.send(`Get workout ${req.params.workoutId}`) 
}

const createNewWorkouts = (req,res) => {

    const workoutNew = workoutService.createNewWorkouts(req.params.workoutId)
    res.send(`Create workout ${req.params.workoutId}`) 
}

const updateOneWorkout = (req,res) => {

    const updateWorkout = workoutService.updateOneWorkout(req.params.workoutId)
    res.send(`Update workout ${req.params.workoutId}`) 
}

const deleteOneWorkout = (req,res) => {

    workoutService.deleteOneWorkout(req.params.workoutId)
    res.send(`Delete workout ${req.params.workoutId}`) 
}

module.exports = {
    getAllWorkouts,
    getOneWorkouts,
    createNewWorkouts,
    updateOneWorkout,
    deleteOneWorkout
}