import express, { type RequestHandler } from 'express';
import { connectDatabase } from './config/database.js';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Team from './models/Team.js';
import User from './models/User.js';
import Workout from './models/Workout.js';

export const baseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

const listHandler = (fetchDocuments: () => Promise<unknown>): RequestHandler =>
  async (_request, response, next) => {
    try {
      response.json(await fetchDocuments());
    } catch (error) {
      next(error);
    }
  };

app.get('/api/users/', listHandler(() => User.find().lean()));
app.get('/api/teams/', listHandler(() => Team.find().populate('members').lean()));
app.get('/api/activities/', listHandler(() => Activity.find().populate('user').lean()));
app.get('/api/leaderboard/', listHandler(() => Leaderboard.find().populate('user team').lean()));
app.get('/api/workouts/', listHandler(() => Workout.find().lean()));

const startServer = async () => {
  await connectDatabase();
  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit API listening at ${baseUrl}`);
  });
};

startServer().catch((error: unknown) => {
  console.error('Unable to start OctoFit API:', error);
  process.exitCode = 1;
});