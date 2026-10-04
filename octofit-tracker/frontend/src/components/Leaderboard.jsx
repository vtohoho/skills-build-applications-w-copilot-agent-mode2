import ApiList from './ApiList.jsx'

const columns = [
  { label: 'Rank', value: (entry) => entry.rank },
  { label: 'User', value: (entry) => entry.user },
  { label: 'Team', value: (entry) => entry.team },
  { label: 'Points', value: (entry) => entry.points },
  { label: 'Period', value: (entry) => entry.period },
]

function Leaderboard() {
  return <ApiList title="Leaderboard" endpoint="/api/leaderboard/" columns={columns} />
}

export default Leaderboard
