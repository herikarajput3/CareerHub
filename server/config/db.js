const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.log("❌ MongoDB connection failed:", err))


const db = mongoose.connection;
db.on('error', err => console.error('MongoDB connection error:', err));
db.once('open', () => console.log('MongoDB connection open and ready!'));

module.exports = mongoose