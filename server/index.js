require('dotenv').config();

const { NODE_ENV } = process.env
const PORT = process.env.PORT || 9000;

const path = require('path')
const express = require('express')
const cors = require("cors")
const app = express()
const {seed} = require('./seed.js')
const {
    getMuscleGroups,
    getWorkouts,
    deleteWorkout,
    addWorkout
} = require('./controller.js');
const { port } = require('pg/lib/defaults');

app.use(cors())
app.use(express.json())

app.post('/seed', seed)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.get("/styles", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.css"))
})

app.get('/js', (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.js"))
})

app.get('/api/muscles', getMuscleGroups)
app.post('/api/workouts', getWorkouts)
app.post('/api/addworkout', addWorkout)
app.delete('/api/workouts', deleteWorkout)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}: http://localhost:${PORT}`)
})

// app.listen(PORT, () => {
//     if (NODE_ENV === 'development'){
//         console.log(`Server running on http://localhost:${PORT}/`)
//     } else{
//         console.log(`Server running on port ${PORT}`)
//     }
// })