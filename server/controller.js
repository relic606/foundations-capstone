require("dotenv").config()
const { send } = require("express/lib/response")
const Sequelize = require("sequelize")
const { CONNECTION_STRING } = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

async function getMuscleGroups(req, res) {
    try{
        const [result] = await sequelize.query(`select * from muscle_groups;`)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
    }
}

async function getWorkouts(req, res) {
    try{
        const [result] = await sequelize.query(` select workouts.workout_name, workouts.muscle_group_id, muscle_groups.muscle_group_description
        from workouts
         join muscle_groups
             on workouts.muscle_group_id = muscle_groups.muscle_group_id
           where muscle_groups.muscle_group_description like '${req.body.value}'
        `)
        console.log(result)
        res.status(200).send(result)
    }
    catch(err){
        console.log(err)
    }
}


async function deleteWorkout(req, res){
    try {
        await sequelize.query(`delete
        from workouts
        where workout_name like '${req.body.value}'`)
        res.status(200).send(console.log('workout deleted'))
    }
    catch(err){
        console.log(err)
    }
}

async function addWorkout(req, res) {
    try{
            const [muscleGroupObj] = await sequelize.query(`select * from muscle_groups
            where muscle_group_description like '${req.body.muscleGroup}';`)
    
            const [result] = await sequelize.query(`insert into workouts (workout_name, muscle_group_id)
            values ('${req.body.textValue}', ${muscleGroupObj[0].muscle_group_id})`)
            
            res.status(200).send(result)
        
    }
    catch(err){
        res.status(400).send(err)
    }
}

module.exports = {
    getMuscleGroups,
    getWorkouts,
    deleteWorkout,
    addWorkout
}