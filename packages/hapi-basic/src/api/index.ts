import { UserEntity, ClientEntity, getConnection } from '@cm-app/database';
import auth from './auth';
import users from './users';


const register = server => {
  const dbConn = getConnection();

  server.bind({
    repository: dbConn.getRepository(UserEntity) //
  });

  server.route([auth, users]);
};

export default { name: 'api', register };
