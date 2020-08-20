import passwordCookie from './local-password';



const register = async server => {
 await server.register(passwordCookie)
};

export default {
  name: 'auth',
  register,
  dependencies: ['@hapi/cookie']
};
