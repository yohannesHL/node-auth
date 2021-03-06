import 'reflect-metadata';
import { createConnection } from 'typeorm';
import createUsers from './users';

export default async function seedDB() {
  const db = await createConnection();
  db.synchronize();

  await createUsers(db);
}
