const express = require('express');
const app = express();

const dotenv = require('dotenv')
dotenv.config()

const port = process.env.Port;
// const dotenv = require('dotenv')

// middleware for parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//require mongoose
const db = require('./config/mongoose');

// use express router
app.use('/', require('./routes'));
// app.get('/', (req, res) => {
//     res.send('Hello there');
// })

app.listen(port, function (err) {
    if (err) {
        console.log('Error in running the server: ', err);
        return;
    }
    console.log('Server is running on port: ', port);
});