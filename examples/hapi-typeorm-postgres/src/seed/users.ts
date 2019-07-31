import { User } from '../entity/User';
import { Connection } from 'typeorm';

export default async function createUsers(db: Connection) {
  const userRepository = db.getRepository(User);
  const usersData = [
    {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@email.com',
      userName: 'john',
      password: '$2b$10$Xo2kWRVD2tpTfml8r73J7unNIeQcQxlbOSi2vPaIEMgUNsEmpT47K'//password
    }
  ];

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
