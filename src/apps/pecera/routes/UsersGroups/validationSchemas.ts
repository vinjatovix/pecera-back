import { body, checkExact, param } from 'express-validator';

const postReqSchema = [
  body('id').exists().isUUID(),
  body('name').exists().isString(),
  body('description').exists().isString(),
  body('editionUsers').exists().isArray(),
  body('visualizationUsers').exists().isArray(),
  checkExact()
];

const patchReqSchema = [
  param('id').exists().isUUID(),
  body('name').optional().isString(),
  body('description').optional().isString(),
  body('editionUsers').optional().isArray(),
  body('visualizationUsers').optional().isArray(),
  checkExact()
];

const deleteReqSchema = [param('id').exists().isUUID(), checkExact()];

export { postReqSchema, patchReqSchema, deleteReqSchema };
