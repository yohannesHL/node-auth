import { ServerRouteConfig } from '../../types/index';
import { SchemaTypes } from '../../../shared/crud';
import { getParamSchema, getQuerySchema, getPayloadSchema } from './schema';

export const getClients: ServerRouteConfig = {
  method: 'GET',
  path: '/clients',
  options: {
    description: 'get clients',
    tags: ['api'],
    auth: 'session',
    validate: {
      query: getQuerySchema(SchemaTypes.RETRIEVE)
    }
  },
  async handler(request, h) {
    return h.response({
      data: await h.context.clientRepository.find()
    });
  }
};

export const getClient: ServerRouteConfig = {
  method: 'GET',
  path: '/clients/{clientId}',
  options: {
    tags: ['api'],
    auth: 'session',
    validate: {
      params: getParamSchema(SchemaTypes.RETRIEVE),
      query: getQuerySchema(SchemaTypes.RETRIEVE)
    }
  },
  async handler(request, h) {
    return h.response({
      data: await h.context.clientRepository.findOne(request.params.clientId)
    });
  }
};

export const createClient: ServerRouteConfig = {
  method: 'POST',
  path: '/clients',
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

export const updateClient: ServerRouteConfig = {
  method: 'PUT',
  path: '/clients/{clientId}',
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
    const client = await clientRepository.findOne(request.params.clientId);
    await clientRepository.merge(client, request.payload);
    return h.response({
      data: await clientRepository.save(client)
    });
  }
};

export const deleteClient: ServerRouteConfig = {
  method: 'DELETE',
  path: '/clients/{clientId}',
  options: {
    auth: 'session',
    tags: ['api'],
    validate: {
      params: getParamSchema(SchemaTypes.DELETE),
      payload: getPayloadSchema(SchemaTypes.DELETE)
    }
  },
  async handler(request, h) {
    return h.response({
      data: h.context.clientRepository.remove(request.params.clientId)
    });
  }
};
