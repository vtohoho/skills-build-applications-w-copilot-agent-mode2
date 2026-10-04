import { useEffect, useState } from 'react'
import { API_BASE_URL, getRecords } from '../api.js'
import ApiList from './ApiList.jsx'

const columns = [
  { label: 'Team', value: (team) => team.name },
  { label: 'Description', value: (team) => team.description },
  { label: 'Members', value: (team) => team.members?.length ?? 0 },
]

function Teams() {
  const [result, setResult] = useState({ status: 'loading', records: [], error: '' })

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${API_BASE_URL}/api/teams/`, { signal: controller.signal })
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

  return <ApiList title="Teams" columns={columns} result={result} />
}

export default Teams
