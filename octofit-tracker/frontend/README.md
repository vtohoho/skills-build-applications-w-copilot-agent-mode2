# OctoFit Tracker frontend

The React 19 presentation tier is served by Vite on port 5173 and calls the API
on port 8000.

## API host configuration

When running the API in GitHub Codespaces, define `VITE_CODESPACE_NAME` in
`.env.local` at the frontend project root. Its value must be your Codespace
name, without a protocol or domain:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite uses this value to call
`https://${VITE_CODESPACE_NAME}-8000.app.github.dev`. Restart the Vite server
after changing `.env.local`, because Vite reads environment variables at
startup.

For local development, `VITE_CODESPACE_NAME` may be left unset; the frontend
then uses `http://localhost:8000` as a safe API fallback.

## Run locally

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```
