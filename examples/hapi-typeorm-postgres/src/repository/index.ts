import 'reflect-metadata';
import { getConnection } from 'typeorm';
import User from '../entity/User';

// getConnectionOptions().then(data => {
//   console.info('getCOnnection', data);
// });

export const RepositoryTypes = {
  USER: User
};

type RepositoryType = RepositoryTypes.USER;

export default async function getRepository(name: RepositoryType) {
  // const dbConn = await getConnection();
  console.info('GETTING repo', name);
  // const repo = await dbConn.getRepository(RepositoryTypes[name]);
  // console.info('GOT repo', repo);

  return repo;
}
