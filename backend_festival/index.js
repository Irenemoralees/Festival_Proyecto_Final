const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors")

// Importar rutas
const userRoutes = require('./routes/user.routes');
const bookingRoutes = require('./routes/booking.routes');
const festivalRoutes = require('./routes/festival.routes');

dotenv.config(); // Cargar variables de entorno desde .env
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Deshabilito CORS policy
app.use(cors())

// Conexión a MongoDB Atlas
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB', err));

// Definir rutas
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/festivals', festivalRoutes);

// Definir el puerto y poner en marcha el servidor
const PORT = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("Express en Vercel")
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app