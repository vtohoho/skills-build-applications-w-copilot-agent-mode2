import { useEffect, useState } from 'react'
import { API_BASE_URL, getRecords } from '../api.js'
import ApiList from './ApiList.jsx'

const columns = [
  { label: 'User', value: (activity) => activity.user },
  { label: 'Activity', value: (activity) => activity.activityType },
  { label: 'Duration (min)', value: (activity) => activity.durationMinutes },
  { label: 'Distance (km)', value: (activity) => activity.distanceKm },
  { label: 'Points', value: (activity) => activity.points },
  { label: 'Completed', value: (activity) => activity.completedAt },
]

function Activities() {
  const [result, setResult] = useState({ status: 'loading', records: [], error: '' })

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${API_BASE_URL}/api/activities/`, { signal: controller.signal })
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

  return <ApiList title="Activities" columns={columns} result={result} />
}

export default Activities
