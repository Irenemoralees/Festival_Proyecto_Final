
import Booking, { find, findById, findByIdAndDelete } from '../models/booking.model';
import { findByIdAndUpdate } from '../models/festival.model';

const bookingController = {
    // Crear una nueva reserva para el festival
    createBooking: async (req, res) => {
        try {
            const { festival, startDate, endDate, price, discount } = req.body;

            // Verificar disponibilidad de entradas para el festival
            const festivalAvailable = await Festivalstival.findById(festival);
            if (!festivalAvailable.available) {
                return res.status(400).json({ message: 'Festival no disponible' });
            }

            const newBooking = new Booking({
                user: req.user._id,
                festival,
                startDate,
                endDate,
                price,
                discount
            });

            await newBooking.save();

            // Actualizar la disponibilidad del vehículo
            await findByIdAndUpdate(vehicle, { available: false });

            res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear la reserva', error: error.message });
        }
    },

    // Obtener reservas por usuario
    getBookingsByUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const bookings = await find({ user: userId }).populate('festival');

            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las reservas', error: error.message });
        }
    },

    // Obtener una reserva específica
    getBooking: async (req, res) => {
        try {
            const { id } = req.params;
            const booking = await findById(id).populate('vehicle');

            if (!booking) {
                return res.status(404).json({ message: 'Reserva no encontrada' });
            }

            res.status(200).json(booking);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la reserva', error: error.message });
        }
    },

       // Obtener todas las reservas
       getAllBookings: async (req, res) => {
        try {
            const bookings = await find().populate('festival').populate('user');

            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener las reservas de los usuarios', error: error.message });
        }
    },


    // Cancelar una reserva
    cancelBooking: async (req, res) => {
        try {
            const { id } = req.params;

            const booking = await findById(id);
            if (!booking) {
                return res.status(404).json({ message: 'Reserva no encontrada' });
            }

            // Actualizar la disponibilidad de tickets para el festival
            await findByIdAndUpdate(booking.festival, { available: true });

            await findByIdAndDelete(id);

            res.status(200).json({ message: 'Booking cancelled successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error al cancelar la reserva', error: error.message });
        }
    },


  // Editar una reserva
   editBooking: async (req, res) => {
    try {
        const { id } = req.params;
        const { startDate, endDate } = req.body;

        // Encontrar la reserva
        const booking = await findById(id);
        if (!booking) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }

        // Actualizar los campos de la reserva
        booking.startDate = startDate || booking.startDate;
        booking.endDate = endDate || booking.endDate;

        await booking.save();

        res.status(200).json({ message: 'Booking updated successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la reserva', error: error.message });
    }
}
};

export default bookingController;