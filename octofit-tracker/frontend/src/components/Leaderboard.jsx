import { useEffect, useState } from 'react'
import { API_BASE_URL, getRecords } from '../api.js'
import ApiList from './ApiList.jsx'

const columns = [
  { label: 'Rank', value: (entry) => entry.rank },
  { label: 'User', value: (entry) => entry.user },
  { label: 'Team', value: (entry) => entry.team },
  { label: 'Points', value: (entry) => entry.points },
  { label: 'Period', value: (entry) => entry.period },
]

function Leaderboard() {
  const [result, setResult] = useState({ status: 'loading', records: [], error: '' })

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${API_BASE_URL}/api/leaderboard/`, { signal: controller.signal })
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

  return <ApiList title="Leaderboard" columns={columns} result={result} />
}

export default Leaderboard
