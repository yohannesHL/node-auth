import { UserEntity, ClientEntity, getConnection } from '@cm-app/database';
import users from './users';


const getRepository = () => {
  const dbConn = getConnection();

  return dbConn.getRepository(UserEntity)
};

export default getRepository;
