import HapiSwagger from 'hapi-swagger';

export default {
  plugin: HapiSwagger,
  options: {
    info: {
      title: process.env.API_NAME,
      description: process.env.API_DESCRIPTION,
      version: process.env.API_VERSION
    },
    swaggerUI: true,
    // tags: [{ name: 'api' }],
    documentationPath: '/docs',
    definitionPrefix: 'useLabel'

    // securityDefinitions: {}
  }
};
