import 'reflect-metadata';
import { getConnection } from 'typeorm';
import * as Entities from '../entity/index';

export const RepositoryTypes = {
  USER: Entities.User
};

type RepositoryType = RepositoryTypes.USER;

export default async function getRepository(entity) {
  const dbConn = await getConnection();
  const repo = await dbConn.getRepository(entity);

  return repo;
}
