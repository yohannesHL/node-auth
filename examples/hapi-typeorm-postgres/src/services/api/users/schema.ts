import Joi from '@hapi/joi';
import { ValidationRules } from '../../../shared/validation';
import { SchemaTypes } from '../../../shared/crud';

const CommonSchema = Joi.object()
  .keys({
    userId: ValidationRules.ID
  })
  .label('User');

const NullSchema = null;

export const getParamSchema = (type: SchemaTypes) => {
  switch (type) {
    case SchemaTypes.RETRIEVE:
    case SchemaTypes.UPDATE:
    case SchemaTypes.DELETE:
      return CommonSchema;

    case SchemaTypes.CREATE:
    default:
      return NullSchema;
  }
};

export const getQuerySchema = (type: SchemaTypes) => {
  switch (type) {
    case SchemaTypes.RETRIEVE:
    case SchemaTypes.UPDATE:
    case SchemaTypes.DELETE:
    case SchemaTypes.CREATE:
    default:
      return NullSchema;
  }
};

export const getPayloadSchema = (type: SchemaTypes) => {
  switch (type) {
    case SchemaTypes.RETRIEVE:
    case SchemaTypes.DELETE:
      return CommonSchema;

    case SchemaTypes.CREATE:
    case SchemaTypes.UPDATE:
      return CommonSchema.keys({
        ...(SchemaTypes.CREATE ? { userId: Joi.forbidden() } : {}),
        firstName: ValidationRules.FIRST_NAME,
        lastName: ValidationRules.LAST_NAME,
        userName: ValidationRules.USER_NAME,
        password: ValidationRules.PASSWORD,
        email: ValidationRules.EMAIL
      }).label(`User_${SchemaTypes.CREATE ? 'Create' : 'Update'}`);
    default:
      return NullSchema;
  }
};
