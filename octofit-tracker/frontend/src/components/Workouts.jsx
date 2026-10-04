import ApiList from './ApiList.jsx'

const columns = [
  { label: 'Workout', value: (workout) => workout.name },
  { label: 'Description', value: (workout) => workout.description },
  { label: 'Category', value: (workout) => workout.category },
  { label: 'Difficulty', value: (workout) => workout.difficulty },
  { label: 'Duration (min)', value: (workout) => workout.durationMinutes },
]

function Workouts() {
  return <ApiList title="Workouts" endpoint="/api/workouts/" columns={columns} />
}

export default Workouts
