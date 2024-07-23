const mongoose = require('mongoose');
const User = require('./models/user.model');
const Festival = require('./models/festival.model');
const Booking = require('./models/booking.model');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

  const users = [
    { _id: new mongoose.Types.ObjectId(), name: "Alice Johnson", email: "alice@example.com", password: "password123", role: "user" },
    { _id: new mongoose.Types.ObjectId(), name: "Bob Smith", email: "bob@example.com", password: "password123", role: "admin" },
    { _id: new mongoose.Types.ObjectId(), name: "Charlie Brown", email: "charlie@example.com", password: "password123", role: "user" },
    { _id: new mongoose.Types.ObjectId(), name: "Dana Scully", email: "dana@example.com", password: "password123", role: "admin" }
];


const festivals = [
];


const bookings = [
    { user: users[0]._id, vehicle: vehicles[0]._id, startDate: new Date(2024, 5, 15), endDate: new Date(2024, 5, 18), price: vehicles[0].pricePerDay * 3 },
    { user: users[2]._id, vehicle: vehicles[2]._id, startDate: new Date(2024, 5, 20), endDate: new Date(2024, 5, 22), price: vehicles[2].pricePerDay * 2 },
    { user: users[1]._id, vehicle: vehicles[1]._id, startDate: new Date(2024, 5, 25), endDate: new Date(2024, 5, 30), price: vehicles[1].pricePerDay * 5 }
];


const seedDB = async () => {
    await User.deleteMany({});
    await Vehicle.deleteMany({});
    await Booking.deleteMany({});
  
    for (const user of users) {
        const newUser = new User(user);
        await newUser.save();
    }

    for (const vehicle of vehicles) {
        const newVehicle = new Vehicle(vehicle);
        await newVehicle.save();
    }

    for (const booking of bookings) {
        const newBooking = new Booking(booking);
        await newBooking.save();
    }
};

seedDB().then(() => {
    console.log(`Seeds creadas correctamente!`)
    mongoose.connection.close();
});