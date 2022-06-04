require('dotenv').config();

const { PORT, NODE_ENV } = process.env

const path = require('path')
const express = require('express')
const app = express()
const {seed} = require('./seed.js')
const {
    getMuscleGroups,
    getWorkouts,
    deleteWorkout,
    addWorkout
} = require('./controller.js')

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
    if (NODE_ENV === 'development'){
        console.log(`Server running on http://localhost:${PORT}/`)
    } else{
        console.log(`Server running on port ${PORT}`)
    }
})