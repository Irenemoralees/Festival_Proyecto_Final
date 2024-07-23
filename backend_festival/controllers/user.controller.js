const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
// Configurar JWT
const JWT_SECRET = 'tu_super_secreto'; // Este debe estar en una variable de entorno
const JWT_EXPIRES_IN = '90d';

const userController = {
   
};

module.exports = userController;