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
  return <ApiList title="Activities" endpoint="/api/activities/" columns={columns} />
}

export default Activities
