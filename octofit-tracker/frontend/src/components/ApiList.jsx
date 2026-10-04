function displayValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }

  if (Array.isArray(value)) {
    return value.map(displayValue).join(', ')
  }

  if (typeof value === 'object') {
    return value.displayName ?? value.name ?? value.username ?? value.email ?? '—'
  }

  return String(value)
}

function ApiList({ title, columns, result }) {
  return (
    <section aria-labelledby={`${title.toLowerCase()}-heading`}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="h2 mb-0" id={`${title.toLowerCase()}-heading`}>
          {title}
        </h1>
      </div>

      {result.status === 'loading' && (
        <p className="text-secondary" role="status">Loading {title.toLowerCase()}…</p>
      )}

      {result.status === 'error' && (
        <div className="alert alert-danger" role="alert">
          Unable to load {title.toLowerCase()}: {result.error}
        </div>
      )}

      {result.status === 'success' && result.records.length === 0 && (
        <p className="text-secondary">No {title.toLowerCase()} found.</p>
      )}

      {result.status === 'success' && result.records.length > 0 && (
        <div className="table-responsive bg-white rounded shadow-sm">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-primary">
              <tr>
                {columns.map((column) => (
                  <th key={column.label} scope="col">{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.records.map((record, index) => (
                <tr key={record._id ?? record.id ?? index}>
                  {columns.map((column) => (
                    <td key={column.label}>
                      {displayValue(column.value(record))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default ApiList
