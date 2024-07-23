const express = require('express');
const router = express.Router();


// Middleware para proteger rutas
const { protect, restrictTo, restrictToSelf } = require('../middlewares/auth.middlware');




module.exports = router;