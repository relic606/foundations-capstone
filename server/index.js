require('dotenv').config();

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

let { PORT, NODE_ENV } = process.env

if (PORT === null || PORT ===""){
    PORT = 9000
}

app.listen(PORT)

// app.listen(PORT, () => {
//     if (NODE_ENV === 'development'){
//         console.log(`Server running on http://localhost:${PORT}/`)
//     } else{
//         console.log(`Server running on port ${PORT}`)
//     }
// })