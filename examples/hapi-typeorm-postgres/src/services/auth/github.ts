

const register = server => {


  server.auth.strategy('github', 'bell', {
    provider: 'github',
    password: 'cookie_encryption_password_secure',
    clientId: 'my_github_client_id',
    clientSecret: 'my_github_client_secret',
    isSecure: false // not using HTTPS
  });



};

export default {
  name: 'github',
  register,
  dependencies: '@hapi/cookie @hapi/bell'
};
