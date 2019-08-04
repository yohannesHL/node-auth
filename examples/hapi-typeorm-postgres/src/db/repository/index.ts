import 'reflect-metadata';
import { getConnection } from 'typeorm';
import Entities from '../entity/index';

// getConnectionOptions().then(data => {
//   console.info('getCOnnection', data);
// });

export const RepositoryTypes = {
  USER: Entities.User
};

type RepositoryType = RepositoryTypes.USER;

export default async function getRepository(entity) {
  const dbConn = await getConnection();
  console.info('GETTING repo...');
  const repo = await dbConn.getRepository(entity);
  console.info('GOT repo...');

  return repo;
}
