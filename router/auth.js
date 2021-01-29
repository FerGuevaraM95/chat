const { Router } = require('express');
const { check } = require('express-validator');

// Controllers
const { createUser, login, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

// Crear nuevos usuarios
router.post('/new', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password es obligatorio').not().isEmpty(),
  check('email', 'El email es obligatorio').isEmail(),
  validateFields
], createUser);

// Login
router.post('/', [
  check('email', 'El email es obligatorio').isEmail(),
  check('password', 'El password es obligatorio').not().isEmpty(),
  validateFields
] ,login);

// Revalidar Token
router.get('/renew', renewToken);

module.exports = router;