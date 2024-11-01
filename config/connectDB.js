const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Connected to MongoDB');
        });

        connection.on('error', (error) => {
            console.error('MongoDB connection error:', error);
        });

        return connection.db; // Return the connected DB instance

    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }
}

module.exports = connectDB;
