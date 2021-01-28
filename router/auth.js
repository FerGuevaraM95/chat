const { Router } = require('express');

// Controllers
const { createUser, login, renewToken } = require('../controllers/auth');

const router = Router();

// Crear nuevos usuarios
router.post('/new', createUser);

// Login
router.post('/', login);

// Revalidar Token
router.get('/renew', renewToken);

module.exports = router;