import Joi from 'joi';

export const ValidationRules = {
  UUID: Joi.string()
    .min(8)
    .max(20),
  ID: Joi.number(),
  FIRST_NAME: Joi.string()
    .min(2)
    .max(20),
  LAST_NAME: Joi.string()
    .min(2)
    .max(20),
  FULL_NAME: Joi.string()
    .min(2)
    .max(50),
  USER_NAME: Joi.string()
    .min(2)
    .max(50),
  PASSWORD: Joi.string()
    .min(2)
    .max(50),
  SHORT_DESCRIPTION: Joi.string()
    .min(2)
    .max(200),
  EMAIL: Joi.string(),
  WEBSITE: Joi.string(),
  ADDRESS_TEXT: Joi.string(),
  CLIENT_STAGE: Joi.string()
    .min(2)
    .max(50),
  CLIENT_META: Joi.string()
    .min(2)
    .max(2000),
  TELEPHONE: Joi.string()
    .min(11)
    .max(14)
};


export default ValidationRules;
