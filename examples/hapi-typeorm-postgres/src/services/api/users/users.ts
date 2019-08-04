import { ServerRouteConfig } from '../../types/index';
import { SchemaTypes } from '../../../shared/crud';
import { getParamSchema, getQuerySchema, getPayloadSchema } from './schema';

export const getUsers: ServerRouteConfig = {
  method: 'GET',
  path: '/users',
  options: {
    tags: ['api', 'user'],
    auth: 'session',
    validate: {
      query: getQuerySchema(SchemaTypes.RETRIEVE)
    },
    async handler(request, h) {
      return h.response({
        data: await h.context.userRepository.find()
      });
    }
  }
};

export const getUser: ServerRouteConfig = {
  method: 'GET',
  path: '/users/{userId}',
  options: {
    tags: ['api'],
    auth: 'session',
    validate: {
      params: getParamSchema(SchemaTypes.RETRIEVE),
      query: getQuerySchema(SchemaTypes.RETRIEVE)
    },
    async handler(request, h) {
      return h.response({
        data: await h.context.clientRepository.findOne(request.params.userId)
      });
    }
  }
};

export const createUser: ServerRouteConfig = {
  method: 'POST',
  path: '/users',
  options: {
    tags: ['api'],
    auth: 'session',
    validate: {
      payload: getPayloadSchema(SchemaTypes.CREATE),
      query: getQuerySchema(SchemaTypes.CREATE)
    }
  },
  async handler(request, h) {
    return h.response({
      data: await h.context.clientRepository.create(request.payload)
    });
  }
};

export const updateUser: ServerRouteConfig = {
  method: 'PUT',
  path: '/users/{userId}',
  options: {
    tags: ['api'],
    auth: 'session',
    validate: {
      params: getParamSchema(SchemaTypes.UPDATE),
      payload: getPayloadSchema(SchemaTypes.UPDATE)
    }
  },
  async handler(request, h) {
    const { clientRepository } = h.context;
    const client = await clientRepository.findOne(request.params.userId);
    await clientRepository.merge(client, request.payload);
    return h.response({
      data: await clientRepository.save(client)
    });
  }
};

export const deleteUser: ServerRouteConfig = {
  method: 'DELETE',
  path: '/users/{userId}',
  config: {
    tags: ['api'],
    auth: 'session',
    validate: {
      params: getParamSchema(SchemaTypes.DELETE),
      payload: getPayloadSchema(SchemaTypes.DELETE)
    }
  },
  async handler(request, h) {
    return h.response({
      data: h.context.clientRepository.remove(request.params.userId)
    });
  }
};
