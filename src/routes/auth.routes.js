//registro 
//login
const { Router } = require('express');
const { register, login } = require('../controllers/auth.controllers');
const router = Router();

//registro
router.post('/register', register);
router.post('/login', login);
 
module.exports = router;