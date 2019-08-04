import { User } from '../entity';
import { Connection } from 'typeorm';
import { users as usersData } from './users_data.json';

export default async function createUsers(db: Connection) {
  const userRepository = db.getRepository(User);

  let createdUser = null;
  for (let data of usersData) {
    // createdUser = await userRepository.create(data);
    // console.info('Created user: ', createdUser);
    createdUser = await userRepository.save(data);
    console.info('Saved user: ', createdUser);
  }
  console.info('CHECKING SEEDED DATA...');
  const allUsers = await userRepository.find();
  console.info('All users = ', allUsers);
}
