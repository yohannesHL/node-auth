import { User } from '../entity';
import { Connection } from 'typeorm';
import { users as usersData } from './users_data.json';

export default async function createUsers(db: Connection) {

  let createdUser = null;
  for (let data of usersData) {
    createdUser = await User.create(data);
    console.info('Created user: ', createdUser);
    await User.save(createdUser);
    console.info('Saved user: ', createdUser);
  }
  console.info('CHECKING SEEDED DATA...');
  const allUsers = await User.find();
  console.info('All users = ', allUsers);
}
