import ApiList from './ApiList.jsx'

const columns = [
  { label: 'Team', value: (team) => team.name },
  { label: 'Description', value: (team) => team.description },
  { label: 'Members', value: (team) => team.members?.length ?? 0 },
]

function Teams() {
  return <ApiList title="Teams" endpoint="/api/teams/" columns={columns} />
}

export default Teams
