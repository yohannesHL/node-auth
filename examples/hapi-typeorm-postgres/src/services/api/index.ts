import { getConnection } from 'typeorm';
import { User } from '../../db/entity/User';
import { Client } from '../../db/entity/Client';
import users from './users';
import clients from './clients';

const register = server => {
  const dbConn = getConnection();
  server.bind({
    userRepository: dbConn.getRepository(User),
    clientRepository: dbConn.getRepository(Client)
  });
  server.route([...users.routes, ...clients.routes]);
};

export default { name: 'api', register };
