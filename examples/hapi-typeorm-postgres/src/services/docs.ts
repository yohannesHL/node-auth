import HapiSwagger from 'hapi-swagger';

export default {
  plugin: HapiSwagger,
  options: {
    info: {
      title: 'Pack.name',
      description: 'Pack.description',
      version: 'Pack.version'
    },
    swaggerUI: true,
    // tags: [{ name: 'api' }],
    documentationPath: '/docs',
    definitionPrefix: 'useLabel'

    // securityDefinitions: {}
  }
};
