import Joi from '@hapi/joi';
import { ValidationRules } from '../../../shared/validation';
import { SchemaTypes } from '../../../shared/crud';

const CommonSchema = Joi.object()
  .keys({
    clientId: ValidationRules.ID
  })
  .label('Client');

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

    case SchemaTypes.UPDATE:
    case SchemaTypes.CREATE:
      return CommonSchema.keys({
        ...(SchemaTypes.CREATE ? { clientId: Joi.forbidden() } : {}),
        companyId: ValidationRules.UUID,
        name: ValidationRules.FULL_NAME,
        description: ValidationRules.SHORT_DESCRIPTION,
        stage: ValidationRules.CLIENT_STAGE,
        meta: ValidationRules.CLIENT_META,
        telephone: ValidationRules.TELEPHONE,
        address: ValidationRules.ADDRESS_TEXT,
        website: ValidationRules.WEBSITE,
        email: ValidationRules.EMAIL
      }).label(`Client_${SchemaTypes.CREATE ? 'Create' : 'Update'}`);

    default:
      return NullSchema;
  }
};
