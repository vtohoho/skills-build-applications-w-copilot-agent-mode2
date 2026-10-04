import ApiList from './ApiList.jsx'

const columns = [
  { label: 'Name', value: (user) => user.displayName },
  { label: 'Username', value: (user) => user.username },
  { label: 'Email', value: (user) => user.email },
  { label: 'Team', value: (user) => user.team },
]

function Users() {
  return <ApiList title="Users" endpoint="/api/users/" columns={columns} />
}

export default Users
