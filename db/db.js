const mongoose = require('mongoose');

const dbUri = process.env.DATABASE_CONNECTION_STRING || '';

const connectDatabase = async () => {
    try {
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    catch (err) {
        process.exit(1);
    }
};

module.exports = connectDatabase;