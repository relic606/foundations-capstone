const muscleGroupSelection = document.getElementById('muscle-group-selector')
const addWorkoutBtn = document.getElementById('add-workout-btn')
const workoutInput = document.getElementById('workout-input')
const deleteWorkoutBtn = document.getElementById('delete-workout-btn')
const addToPlanBtn = document.getElementById('add-to-plan-btn')
const weekdaySelector = document.getElementById('weekday-selector')
const sundayList = document.getElementById('sunday-list')
const mondayList = document.getElementById('monday-list')
const tuesdayList = document.getElementById('tuesday-list')
const wednesdayList = document.getElementById('wednesday-list')
const thursdayList = document.getElementById('thursday-list')
const fridayList = document.getElementById('friday-list')
const saturdayList = document.getElementById('saturday-list')
const resetWeekBtn = document.getElementById('reset-week-btn')
const removeLastSundayBtn = document.getElementById('remove-last-sunday-btn')
const removeLastMondayBtn = document.getElementById('remove-last-monday-btn')
const removeLastTuesdayBtn = document.getElementById('remove-last-tuesday-btn')
const removeLastWednesdayBtn = document.getElementById('remove-last-wednesday-btn')
const removeLastThursdayBtn = document.getElementById('remove-last-thursday-btn')
const removeLastFridayBtn = document.getElementById('remove-last-friday-btn')
const removeLastSaturdayBtn = document.getElementById('remove-last-saturday-btn')


async function getMusclesGroups(){
    try {
        const res = await axios.get('/api/muscles')
        const muscleGroupSelection = document.getElementById('muscle-group-selector')
        
        for (i = 0; i < res.data.length; i++){
            const newOption = document.createElement("option")
            newOption.value = res.data[i].muscle_group_description
            newOption.innerHTML = res.data[i].muscle_group_description
            muscleGroupSelection.add(newOption)
        }
        
    }
    catch (error){
        console.log(error)
    }
}

getMusclesGroups()

muscleGroupSelection.addEventListener('change', (event) => {
        const workoutSelector = document.getElementById('workout-selector')
        while (workoutSelector.options.length>1){
            workoutSelector.remove(1)
        }
    axios.post('http://localhost:9000/api/workouts', { value: event.target.value })
        .then(res => {
        for (i = 0; i< res.data.length; i++){
            const newOption = document.createElement("option")
            newOption.value = res.data[i].workout_name
            newOption.innerHTML = res.data[i].workout_name
            workoutSelector.add(newOption)
        }})
        .catch(err => console.log(err))
})


addWorkoutBtn.addEventListener('click', () => {
    const workoutSelector = document.getElementById('workout-selector')
    if(muscleGroupSelection.value === 'default'){
        alert('Please select a muscle group')
    }
    else if(workoutInput.value === ''){
        alert('Please enter the name of a workout')
    }
    else{
    axios.post('http://localhost:9000/api/addworkout', {textValue: workoutInput.value, muscleGroup: muscleGroupSelection.value})
        .then(res => {
            workoutSelector.innerHTML = '<option value="default">Select an option</option>'
            workoutSelector.value = 'default'
            muscleGroupSelection.value = 'default'
            alert('Workout added successfully')
            workoutInput.value = ""
            console.log(res)
        })
        .catch(err => {
            console.log(err)
            alert('Error Adding Workout')
        })}
})


deleteWorkoutBtn.addEventListener('click', () => {
    
    const workoutSelector = document.getElementById('workout-selector')
    workoutSelectorValue = workoutSelector.value
    if (workoutSelectorValue === 'default'){
        alert('Please select a workout to delete')
    }
    else if(confirm(`Please confirm if you'd like to delete the workout: ${workoutSelectorValue}`) == true)
    {
        axios.delete(`http://localhost:9000/api/workouts`, { data: {
            value: workoutSelectorValue
        }})
        .then(res => {
            alert('Workout deleted')
            workoutSelector.innerHTML = '<option value="default">Select an option</option>'
            workoutSelector.value = 'default'
            muscleGroupSelection.value = 'default'
            console.log(res)
        })
        .catch(err => {
            alert('Error deleting workout')
            console.log(err)
        })

    }
    else{
        alert('Delete workout cancelled')
    }
} )

addToPlanBtn.addEventListener('click', () => {
    const workoutSelector = document.getElementById('workout-selector')
    const newListItem = document.createElement('li')
    newListItem.classList.add("initial-list-elem")
    newListItem.classList.remove("initial-list-elem")
    newListItem.classList.add("list-elem")
    newListItem.innerHTML = workoutSelector.value
    if (workoutSelector.value === 'default'){
        alert('Please select a workout to add to your plan')
    }
    else if (weekdaySelector.value === 'sunday'){
        if(sundayList.getElementsByTagName('li').length >= 12){
            alert(`Workout plan limit reached for ${weekdaySelector.value}`)
        }else{
            sundayList.appendChild(newListItem)
        }
    }
    else if(weekdaySelector.value ==='monday'){
        if(mondayList.getElementsByTagName('li').length >= 12){
            alert(`Workout plan limit reached for ${weekdaySelector.value}`)
        }else{
            mondayList.appendChild(newListItem)
        }

    }
    else if(weekdaySelector.value ==='tuesday'){
        if(tuesdayList.getElementsByTagName('li').length >= 12){
            alert(`Workout plan limit reached for ${weekdaySelector.value}`)
        }else{
            tuesdayList.appendChild(newListItem)
        }
    }
    else if(weekdaySelector.value ==='wednesday'){
        if(wednesdayList.getElementsByTagName('li').length >= 12){
            alert(`Workout plan limit reached for ${weekdaySelector.value}`)
        }else{
            wednesdayList.appendChild(newListItem)
        }
    }
    else if(weekdaySelector.value ==='thursday'){
        if(thursdayList.getElementsByTagName('li').length >= 12){
            alert(`Workout plan limit reached for ${weekdaySelector.value}`)
        }else{
            thursdayList.appendChild(newListItem)
        }
    }
    else if(weekdaySelector.value ==='friday'){
        if(fridayList.getElementsByTagName('li').length >= 12){
            alert(`Workout plan limit reached for ${weekdaySelector.value}`)
        }else{
            fridayList.appendChild(newListItem)
        }
    }
    else if(weekdaySelector.value ==='saturday'){
        if(saturdayList.getElementsByTagName('li').length >= 12){
            alert(`Workout plan limit reached for ${weekdaySelector.value}`)
        }else{
            saturdayList.appendChild(newListItem)
        }
    }
})

resetWeekBtn.addEventListener('click', () => {
    sundayList.innerHTML = ""
    mondayList.innerHTML = ""
    tuesdayList.innerHTML = ""
    wednesdayList.innerHTML = ""
    thursdayList.innerHTML = ""
    fridayList.innerHTML = ""
    saturdayList.innerHTML = ""
})

removeLastSundayBtn.addEventListener('click', () => {
    sundayListLength = sundayList.getElementsByTagName('li').length
    sundayList.getElementsByTagName('li')[sundayListLength-1].remove()
})

removeLastMondayBtn.addEventListener('click', () => {
    mondayListLength = mondayList.getElementsByTagName('li').length
    mondayList.getElementsByTagName('li')[mondayListLength-1].remove()
})

removeLastTuesdayBtn.addEventListener('click', () => {
    tuesdayListLength = tuesdayList.getElementsByTagName('li').length
    tuesdayList.getElementsByTagName('li')[tuesdayListLength-1].remove()
})

removeLastWednesdayBtn.addEventListener('click', () => {
    wednesdayListLength = wednesdayList.getElementsByTagName('li').length
    wednesdayList.getElementsByTagName('li')[wednesdayListLength-1].remove()
})

removeLastThursdayBtn.addEventListener('click', () => {
    thursdayListLength = thursdayList.getElementsByTagName('li').length
    thursdayList.getElementsByTagName('li')[thursdayListLength-1].remove()
})

removeLastFridayBtn.addEventListener('click', () => {
    fridayListLength = fridayList.getElementsByTagName('li').length
    fridayList.getElementsByTagName('li')[fridayListLength-1].remove()
})

removeLastSaturdayBtn.addEventListener('click', () => {
    saturdayListLength = saturdayList.getElementsByTagName('li').length
    saturdayList.getElementsByTagName('li')[saturdayListLength-1].remove()
})