require("dotenv").config()
const {CONNECTION_STRING}=process.env
const Sequelize = require("sequelize")

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        drop table if exists workouts;
        drop table if exists muscle_groups;

        create table muscle_groups (
            muscle_group_id serial primary key,
            muscle_group_description text
        );

        create table workouts (
            workout_id serial primary key,
            workout_name varchar(50),
            muscle_group_id integer references muscle_groups(muscle_group_id),
            unique(workout_name)
        );

        insert into muscle_groups (muscle_group_description)
        values('Chest'), ('Back'), ('Shoulders'), ('Triceps'),
        ('Biceps'), ('Forearms'), ('Abs'), ('Cardio');

        insert into workouts (muscle_group_id, workout_name)
        values (1, 'Dumbbell Bench Press'), (1, 'Dumbbell Flyes'), (1, 'Pushup'), (1, 'Chest Dip'), (1, 'Incline Bench Press'),
        (2, 'Deadlift'), (2,'Bent-Over Row'), (2, 'Lat Pulldown'),
        (3, 'Standing Dumbbell Fly'), (3, 'Dumbbell Shoulder Press' ), (3, 'Dumbbell Shrug'),
        (4, 'Dumbbell Kickback'), (4, 'Rope Pushdown'), (4, 'Lying Tricep Extension'),
        (5, 'Incline Dumbbell Curl'), (5, 'Chin-Up'), (5, 'Hammer Curl'),
        (6, 'Wrist Roller'), (6, 'Towel Pullup'), (6, 'Seated Wrist Curl'),
        (7, 'Sit-ups'), (7, 'Crunches'), (7, 'Russian Twist'),
        (8, 'Jogging'), (8, 'Hiking'), (8, 'Basketball'), (8, 'Tennis')
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}
