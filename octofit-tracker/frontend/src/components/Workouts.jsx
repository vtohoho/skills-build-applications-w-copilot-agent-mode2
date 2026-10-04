import { useEffect, useState } from 'react'
import { API_BASE_URL, getRecords } from '../api.js'
import ApiList from './ApiList.jsx'

const columns = [
  { label: 'Workout', value: (workout) => workout.name },
  { label: 'Description', value: (workout) => workout.description },
  { label: 'Category', value: (workout) => workout.category },
  { label: 'Difficulty', value: (workout) => workout.difficulty },
  { label: 'Duration (min)', value: (workout) => workout.durationMinutes },
]

function Workouts() {
  const [result, setResult] = useState({ status: 'loading', records: [], error: '' })

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${API_BASE_URL}/api/workouts/`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}.`)
        }
        return response.json()
      })
      .then((payload) => {
        setResult({ status: 'success', records: getRecords(payload), error: '' })
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setResult({ status: 'error', records: [], error: error.message })
        }
      })

    return () => controller.abort()
  }, [])

  return <ApiList title="Workouts" columns={columns} result={result} />
}

export default Workouts
