const Festival = require('../models/festival.model');

const festivalController = {
    // Agregar un nuevo festival
    addFestival: async (req, res) => {
        try {
            const { festivalName, type, description, image, location, video, price } = req.body;
            const newFestival = new Festival({
                festivalName,
                type,
                description,
                image,
                location,
                video,
                price,
                available: true,
            });

            await newFestival.save();
            res.status(201).json({ message: 'Festival agregado con éxito', festival: newFestival });
        } catch (error) {
            res.status(500).json({ message: 'Error al agregar el festival', error: error.message });
        }
    },

    // Obtener todos los festivales
    getAllFestivals: async (req, res) => {
        try {
            const festivals = await Festival.find({});
            res.status(200).json(festivals);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los festivales', error: error.message });
        }
    },

    // Obtener un festival específico
    getFestival: async (req, res) => {
        try {
            const { id } = req.params;
            const festival = await Festival.findById(id);

            if (!festival) {
                return res.status(404).json({ message: 'Festival no encontrado' });
            }

            res.status(200).json(festival);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el festival', error: error.message });
        }
    },

    // Actualizar un festival
    updateFestival: async (req, res) => {
        try {
            const { id } = req.params;
            const { festivalName, type, description, image, location, video, price, available } = req.body;
            const updatedFestival = await Festival.findByIdAndUpdate(id, {
                festivalName,
                type,
                description,
                image,
                location,
                video,
                price,
                available
            }, { new: true });

                  
            if (!updatedFestival) {
                return res.status(404).json({ message: 'Festival no encontrado' });
            }

            res.status(200).json({ message: 'Festival actualizado con éxito', festival: updatedFestival });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el festival', error: error.message });
        }
    },

    // Eliminar un festival
    deleteFestival: async (req, res) => {
        try {
            const { id } = req.params;
            const deletedFestival = await Festival.findByIdAndDelete(id);

            if (!deletedFestival) {
                return res.status(404).json({ message: 'Festival no encontrado' });
            }

            res.status(200).json({ message: 'Festival eliminado con éxito' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el festival', error: error.message });
        }
    }
};

module.exports = festivalController;


