import { getConnection } from 'typeorm';
import { User } from '../../entity/User';
import { Client } from '../../entity/Client';
import hello from './hello';
import users from './users';
import clients from './clients';

const register = server => {
  const dbConn = getConnection();
  server.bind({
    userRepository: dbConn.getRepository(User),
    clientRepository: dbConn.getRepository(Client)
  });
  server.route([...hello.routes, ...users.routes, ...clients.routes]);
};

export default { name: 'api', register };
