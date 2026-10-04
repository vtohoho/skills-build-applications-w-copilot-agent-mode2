const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function getRecords(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  const candidates = [
    payload?.results,
    payload?.data,
    payload?.items,
    payload?.data?.results,
  ]
  const records = candidates.find(Array.isArray)

  if (!records) {
    throw new Error('The API response did not contain a list of records.')
  }

  return records
}
