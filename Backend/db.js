const mongoose = require('mongoose');
require('dotenv').config();

console.log("MONGO URI:", process.env.MONGODB_URI);
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err, 'Failed to connect to MongoDB'));


module.exports = mongoose;