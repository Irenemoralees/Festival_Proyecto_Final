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
    {  name: "Alice Johnson", email: "alice@example.com", password: "password123", role: "user" },
    {  name: "Bob Smith", email: "bob@example.com", password: "password123", role: "admin" },
    {  name: "Charlie Brown", email: "charlie@example.com", password: "password123", role: "user" },
    { name: "Dana Scully", email: "dana@example.com", password: "password123", role: "admin" }
];


const festivals = [
    
];





const seedDB = async () => {
    await User.deleteMany({});
    await Festival.deleteMany({});
    await Booking.deleteMany({});
  
    for (const user of users) {
        const newUser = new User(user);
        await newUser.save();
    }

    for (const festival of festivals) {
        const newFestival = new Festival(festival);
        await newFestival.save();
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