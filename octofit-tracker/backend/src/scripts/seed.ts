import mongoose from 'mongoose';
import { Types } from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const userIds = {
  maya: new Types.ObjectId('670000000000000000000001'),
  noah: new Types.ObjectId('670000000000000000000002'),
  ava: new Types.ObjectId('670000000000000000000003'),
  liam: new Types.ObjectId('670000000000000000000004'),
};

const teamIds = {
  striders: new Types.ObjectId('670000000000000000000101'),
  fitCrew: new Types.ObjectId('670000000000000000000102'),
};

const seededIds = {
  activities: [
    '670000000000000000000201',
    '670000000000000000000202',
    '670000000000000000000203',
    '670000000000000000000204',
    '670000000000000000000205',
    '670000000000000000000206',
  ].map((value) => new Types.ObjectId(value)),
  leaderboard: [
    '670000000000000000000301',
    '670000000000000000000302',
    '670000000000000000000303',
    '670000000000000000000304',
  ].map((value) => new Types.ObjectId(value)),
  workouts: [
    '670000000000000000000401',
    '670000000000000000000402',
    '670000000000000000000403',
    '670000000000000000000404',
    '670000000000000000000405',
  ].map((value) => new Types.ObjectId(value)),
};

const daysAgo = (days: number) => new Date(Date.now() - days * 24 * 60 * 60 * 1000);

/** Seed the octofit_db database with test data. */
async function seedDatabase(): Promise<void> {
  try {
    console.log('Seed the octofit_db database with test data');
    await connectDatabase();

    await Promise.all([
      Activity.deleteMany({ _id: { $in: seededIds.activities } }),
      Leaderboard.deleteMany({ _id: { $in: seededIds.leaderboard } }),
      Workout.deleteMany({ _id: { $in: seededIds.workouts } }),
      Team.deleteMany({ _id: { $in: Object.values(teamIds) } }),
      User.deleteMany({ _id: { $in: Object.values(userIds) } }),
    ]);

    await User.create([
      { _id: userIds.maya, username: 'maya-chen', email: 'maya.chen@mergington.edu', displayName: 'Maya Chen', team: teamIds.striders },
      { _id: userIds.noah, username: 'noah-patel', email: 'noah.patel@mergington.edu', displayName: 'Noah Patel', team: teamIds.striders },
      { _id: userIds.ava, username: 'ava-rodriguez', email: 'ava.rodriguez@mergington.edu', displayName: 'Ava Rodriguez', team: teamIds.fitCrew },
      { _id: userIds.liam, username: 'liam-foster', email: 'liam.foster@mergington.edu', displayName: 'Liam Foster', team: teamIds.fitCrew },
    ]);

    await Team.create([
      {
        _id: teamIds.striders,
        name: 'Octo Striders',
        description: 'A running and walking team focused on steady weekly progress.',
        members: [userIds.maya, userIds.noah],
      },
      {
        _id: teamIds.fitCrew,
        name: 'Mergington Fit Crew',
        description: 'A balanced team mixing strength, mobility, and cardio sessions.',
        members: [userIds.ava, userIds.liam],
      },
    ]);

    await Activity.create([
      { _id: seededIds.activities[0], user: userIds.maya, activityType: 'run', durationMinutes: 32, distanceKm: 4.8, points: 48, completedAt: daysAgo(1) },
      { _id: seededIds.activities[1], user: userIds.noah, activityType: 'run', durationMinutes: 28, distanceKm: 4.2, points: 42, completedAt: daysAgo(2) },
      { _id: seededIds.activities[2], user: userIds.ava, activityType: 'strength', durationMinutes: 40, points: 40, completedAt: daysAgo(1) },
      { _id: seededIds.activities[3], user: userIds.liam, activityType: 'walk', durationMinutes: 35, distanceKm: 2.7, points: 27, completedAt: daysAgo(3) },
      { _id: seededIds.activities[4], user: userIds.maya, activityType: 'walk', durationMinutes: 24, distanceKm: 1.9, points: 19, completedAt: daysAgo(5) },
      { _id: seededIds.activities[5], user: userIds.ava, activityType: 'run', durationMinutes: 25, distanceKm: 3.6, points: 36, completedAt: daysAgo(6) },
    ]);

    const period = new Date().toISOString().slice(0, 7);
    await Leaderboard.create([
      { _id: seededIds.leaderboard[0], user: userIds.maya, team: teamIds.striders, period, points: 67, rank: 2 },
      { _id: seededIds.leaderboard[1], user: userIds.ava, team: teamIds.fitCrew, period, points: 76, rank: 1 },
      { _id: seededIds.leaderboard[2], user: userIds.noah, team: teamIds.striders, period, points: 42, rank: 3 },
      { _id: seededIds.leaderboard[3], user: userIds.liam, team: teamIds.fitCrew, period, points: 27, rank: 4 },
    ]);

    await Workout.create([
      { _id: seededIds.workouts[0], name: 'Easy Park Run', description: 'A conversational-pace run on a flat route.', category: 'cardio', difficulty: 'beginner', durationMinutes: 25 },
      { _id: seededIds.workouts[1], name: 'Short Intervals', description: 'Alternate brisk running with relaxed recovery periods.', category: 'cardio', difficulty: 'intermediate', durationMinutes: 30 },
      { _id: seededIds.workouts[2], name: 'Bodyweight Circuit', description: 'Complete controlled rounds of squats, push-ups, and planks.', category: 'strength', difficulty: 'beginner', durationMinutes: 20 },
      { _id: seededIds.workouts[3], name: 'Full-body Strength', description: 'A balanced strength session using safe, moderate effort.', category: 'strength', difficulty: 'intermediate', durationMinutes: 35 },
      { _id: seededIds.workouts[4], name: 'Recovery Walk', description: 'Take a brisk walk and finish with gentle mobility work.', category: 'recovery', difficulty: 'beginner', durationMinutes: 20 },
    ]);

    console.log('Seeded 4 users, 2 teams, 6 activities, 4 leaderboard entries, and 5 workouts.');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
