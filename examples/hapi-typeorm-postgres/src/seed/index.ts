import createUsers from './users';
import { createConnection } from 'typeorm';
import 'reflect-metadata';

export default async function seedDB() {
  const db = await createConnection();
  db.synchronize(); // auto create tables

  console.info('Connected to DB', db.name, db.options);

  await createUsers(db);
}
