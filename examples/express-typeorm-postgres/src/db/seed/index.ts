import { createConnection } from 'typeorm';
import 'reflect-metadata';

export default async function seedDB() {
  const db = await createConnection();
  db.synchronize();
}
