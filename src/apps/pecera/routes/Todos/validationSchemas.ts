import { body, checkExact, param } from 'express-validator';

const postReqSchema = [
  body('id').exists().isUUID(),
  body('title').exists().isString(),
  body('category').exists().isString(),
  body('description').exists().isString(),
  body('duration').exists().isString(),
  body('price').exists().isString(),
  body('rank').exists().isNumeric(),
  checkExact()
];

const patchReqSchema = [
  param('id').exists().isUUID(),
  body('title').optional().isString(),
  body('category').optional().isString(),
  body('description').optional().isString(),
  body('duration').optional().isString(),
  body('price').optional().isString(),
  body('rank').optional().isNumeric(),
  checkExact()
];

const getReqSchema = [param('id').exists().isUUID(), checkExact()];
const deleteReqSchema = [param('id').exists().isUUID(), checkExact()];

export { postReqSchema, patchReqSchema, getReqSchema, deleteReqSchema };
