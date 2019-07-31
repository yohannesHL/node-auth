import * as UsersApi from './users';

export default {
  routes: [
    UsersApi.getUsers,
    UsersApi.getUser,
    UsersApi.createUser,
    UsersApi.updateUser,
    UsersApi.deleteUser
  ]
};
