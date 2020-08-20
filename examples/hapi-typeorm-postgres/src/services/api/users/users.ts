import { ServerRouteConfig } from '../../../types/index';
import { SchemaTypes } from '../../../shared/crud';
import { getParamSchema, getQuerySchema, getPayloadSchema } from './schema';
import User from '../../../db/entity/User';

export const getUsers: ServerRouteConfig = {
  method: 'GET',
  path: '/users',
  options: {
    tags: ['api', 'user'],
    auth: 'local-password',
    validate: {
      query: getQuerySchema(SchemaTypes.RETRIEVE)
    },
    async handler(request, h) {
      return h.response({
        data: await User.find()
      });
    }
  }
};

export const getUser: ServerRouteConfig = {
  method: 'GET',
  path: '/users/{userId}',
  options: {
    tags: ['api'],
    auth: 'local-password',
    validate: {
      params: getParamSchema(SchemaTypes.RETRIEVE),
      query: getQuerySchema(SchemaTypes.RETRIEVE)
    },
    async handler(request, h) {
      return h.response({
        data: await User.findOne(request.params.userId)
      });
    }
  }
};

export const createUser: ServerRouteConfig = {
  method: 'POST',
  path: '/users',
  options: {
    tags: ['api'],
    auth: 'local-password',
    validate: {
      payload: getPayloadSchema(SchemaTypes.CREATE),
      query: getQuerySchema(SchemaTypes.CREATE)
    }
  },
  async handler(request, h) {
    return h.response({
      data: await User.create(request.payload)
    });
  }
};

export const updateUser: ServerRouteConfig = {
  method: 'PUT',
  path: '/users/{userId}',
  options: {
    tags: ['api'],
    auth: 'local-password',
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
    auth: 'local-password',
    validate: {
      params: getParamSchema(SchemaTypes.DELETE),
      payload: getPayloadSchema(SchemaTypes.DELETE)
    }
  },
  async handler(request, h) {
    return h.response({
      data: User.remove(request.params.userId)
    });
  }
};
