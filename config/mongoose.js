const mongoose = require('mongoose');

// mongoose.connect(process.env.Mongo_url);
mongoose.connect(`mongodb+srv://${process.env.username}:${process.env.password}@cluster0.vr1lmle.mongodb.net/?retryWrites=true&w=majority`)

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function () {
    console.log('Connected to MongoDB');
});

module.exports = db