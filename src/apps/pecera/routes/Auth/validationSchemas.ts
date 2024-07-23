import { body, check, checkExact, param } from 'express-validator';

const loginReqSchema = [
  body('email').exists().isEmail(),
  body('password').exists().isString(),
  checkExact()
];

const registerReqSchema = [
  body('email').exists().isEmail(),
  body('username').exists().isString(),
  body('password').exists().isStrongPassword(),
  body('repeatPassword').exists().isStrongPassword(),
  check('repeatPassword', 'Passwords do not match').custom(
    (value: string, { req }) => value === req.body.password
  ),
  checkExact()
];

const validateMailReqSchema = [
  param('token').exists().isString(),
  checkExact()
];

export { loginReqSchema, registerReqSchema, validateMailReqSchema };
