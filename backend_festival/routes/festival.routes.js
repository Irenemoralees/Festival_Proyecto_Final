const express = require('express');
const router = express.Router();
const festivalController = require('../controllers/festival.controller');

// Middleware para proteger rutas y restringir acceso solo a roles específicos
const { protect, restrictTo } = require('../middlewares/auth.middlware');

// Ruta para agregar un nuevo festival (solo accesible para administradores)
router.post('/', protect, restrictTo('admin'), festivalController.addFestival);

// Ruta para obtener todos los festivales (accesible para cualquier usuario)
router.get('/', festivalController.getAllFestivals);

// Ruta para obtener un festival específico (accesible para cualquier usuario)
router.get('/:id', festivalController.getFestival);

// Ruta para actualizar un festival (solo accesible para administradores)
router.patch('/:id', protect, restrictTo('admin'), festivalController.updateFestival);

// Ruta para eliminar un festival (solo accesible para administradores)
router.delete('/:id', protect, restrictTo('admin'), festivalController.deleteFestival);

module.exports = router;