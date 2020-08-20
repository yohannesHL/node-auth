import { getConnection } from 'typeorm';
import users from './users';
import clients from './clients';

const register = server => {
  const dbConn = getConnection();

  server.route([...users.routes, ...clients.routes]);
};

export default { name: 'api', register };
